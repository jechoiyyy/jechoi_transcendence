import React from 'react';

const Footer = () => {
    return (
        <footer className="w-full py-6 text-center text-sm text-white/70 mt-auto">
            <div className="max-w-4xl mx-auto">© {new Date().getFullYear()} ft_transcendence • Made with 우당탕탕 3기 특공대</div>
        </footer>
    );
};

export default Footer;