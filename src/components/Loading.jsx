export const Loading = () => {
    return (
        <div className='loading bg-[rgba(0,0,0,0.7)] z-50 text-white fixed top-0 left-0 w-full h-screen overflow-hidden grid place-items-center'>
            <p className="text-5xl ">Loading
                <span className="dot1">.</span>
                <span className="dot2">.</span>
                <span className="dot3">.</span>
            </p>
        </div>
    )
}
