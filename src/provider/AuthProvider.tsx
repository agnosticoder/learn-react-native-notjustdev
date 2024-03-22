import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Session } from '@supabase/supabase-js';
import { Tables } from '../database.types';

type AuthData = {
    session: Session | null;
    profile: any;
    isAdmin: boolean;
    loading: boolean;
}

const AuthContext = createContext<AuthData>({session: null, profile: null, isAdmin: false, loading: true});

// useAuth hook
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [session, setSession ] = useState<Session | null>(null);
    const [profile, setProfile] = useState<Tables<'profiles'> | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSession = async () => {
            const { data: {session} } = await supabase.auth.getSession();
            setSession(session);

            if (session) {
                //fetch profile
                const { data } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', session.user.id)
                    .single();
                setProfile(data || null);
            }

            setLoading(false);
        };

        fetchSession();

        supabase.auth.onAuthStateChange((event, session) => {
            setSession(session);
        });
    }, []);

    const isAdmin = profile?.group === 'ADMIN';

    return <AuthContext.Provider value={{session, profile, isAdmin, loading}}>{children}</AuthContext.Provider>;
};

export default AuthProvider;