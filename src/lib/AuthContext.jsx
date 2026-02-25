import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from './supabase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    // Ensure auth user has a matching row in public.users
    const ensurePublicUser = async (authUser) => {
        if (!authUser) return;
        try {
            const { data } = await supabase
                .from('users')
                .select('id')
                .eq('id', authUser.id)
                .single();

            if (!data) {
                // Insert a new public user row with the same ID as auth.users
                await supabase.from('users').insert([{
                    id: authUser.id,
                    username: authUser.email?.split('@')[0] || `user_${authUser.id.slice(0, 6)}`,
                    points: 0,
                }]);
            }
        } catch (err) {
            // Row might already exist or insert might fail — that's OK
            console.log('ensurePublicUser:', err.message);
        }
    };

    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setUser(session?.user ?? null);
            if (session?.user) ensurePublicUser(session.user);
            setLoading(false);
        });

        // Listen for auth state changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
            if (session?.user) ensurePublicUser(session.user);
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const signIn = async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        return { data, error };
    };

    const signUp = async (email, password) => {
        const { data, error } = await supabase.auth.signUp({ email, password });
        return { data, error };
    };

    const signOut = async () => {
        await supabase.auth.signOut();
    };

    return (
        <AuthContext.Provider value={{ user, session, loading, signIn, signUp, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
    return ctx;
};
