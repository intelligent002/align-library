module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                nunito: ['"Nunito Sans"', 'sans-serif'],
            },
            spacing: {
                'lib-w': '682px',
                'lib-h': '1057px',
            },
            boxShadow: {
                navbar: '0 0 12px rgba(172, 181, 212, 0.255)',
                avatarTopRight: '0 0 16px rgba(172, 181, 212, 0.3)',
                library: '0px 8px 16px rgba(172, 181, 212, 0.3)'
            },
            padding: {
                'lib': '26px',
            },
        }
    },
    plugins: [],
};