export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-xs">
      
      <div className="w-[200px] h-[140px] relative">
        <div className="loader-inner w-full h-full rounded-[13px] relative z-[1] perspective shadow-md">
          <ul className="relative m-0 p-0 list-none">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <li key={i} className={`page page-${i}`}>
                <svg viewBox="0 0 90 120" className="w-[90px] h-[120px]">
                  <path
                    fill="currentColor"
                    d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z"
                  />
                </svg>
              </li>
            ))}
          </ul>
        </div>

        <span className="absolute top-full mt-5 left-0 right-0 text-center text-gray-600 font-medium">
          Loading...
        </span>
      </div>

    </div>
  );
}