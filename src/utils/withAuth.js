// hoc/withAuth.js
import { useUser } from '../context/UserContext';
import { useRouter } from 'next/navigation';
import React from 'react';

const withAuth = (WrappedComponent, allowedRoles) => {
    const AuthHOC = (props) => {
        const { user } = useUser(); // Adjust this if you're using server-side auth
        const router = useRouter();

        if (!user) {
            // Redirect to login if not authenticated
            router.push('/unauthorize');
            return null;
        }

        if (!allowedRoles.includes(user.role)) {
            // Redirect if user doesn't have the right role
            router.push('/unauthorize');
            return null;
        }

        return <WrappedComponent {...props} />;
    };

    AuthHOC.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    return AuthHOC;
};

export default withAuth;
