export default function TopNav() {
    return (
        <header
            className="w-full h-[55px] bg-white shadow-[0_0_12px_rgba(172,181,212,0.255)] pl-6 flex items-center justify-between">

            {/* Logo */}
            <div className="pt-[18px] pb-[16px]">
                <img src="/assets/logo.svg" alt="Aligned" className="h-6"/>
            </div>

            {/* Avatar block here... */}
            <div className="ml-auto w-[77px] h-full flex items-center relative">

                {/* Vertical line */}
                <div
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 w-[2px] h-[57px] bg-[#EFF3FA] rounded">
                </div>

                {/* Centered avatar in 75px */}
                <div className="flex-1 flex items-center justify-center">
                    <div className="w-9 h-9 rounded-full shadow-avatarTopRight overflow-hidden">
                        <img
                            src="/avatars/top-right.jpg"
                            alt="Avatar"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
}
