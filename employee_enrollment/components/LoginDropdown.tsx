import Link from "next/link";
export default function LoginDropdown() {
  return (
    <div
      className="
        absolute
        right-0
        top-12
        opacity-0
        invisible
        translate-y-4
        transition-all
        duration-300
        group-hover:visible
        group-hover:opacity-100
        group-hover:translate-y-0
      "
    >
      <div
        className="
          w-[850px]
          border
          border-neutral-700
          bg-black/95
          backdrop-blur-xl
          rounded-2xl
          overflow-hidden
          shadow-2xl
        "
      >

        <div className="grid grid-cols-2">

          {/* LEFT */}

          <div className="p-12 border-r border-neutral-800">

            <h3 className="text-3xl font-bold mb-10">
              Sign In
            </h3>

            <input
              type="email"
              placeholder="Email Address"
              className="
                w-full
                bg-transparent
                border-b
                border-neutral-700
                py-4
                outline-none
                mb-8
              "
            />

            <input
              type="password"
              placeholder="Password"
              className="
                w-full
                bg-transparent
                border-b
                border-neutral-700
                py-4
                outline-none
              "
            />
            
            <button
              className="
                mt-12
                px-8
                py-3
                rounded-full
                border
                border-white
                hover:bg-white
                hover:text-black
                transition-all
                duration-300
              "
            >
              Login →
            </button>

          </div>

          {/* RIGHT */}

          <div className="p-12">

            <h3 className="text-3xl font-bold mb-10">
              Why create an account?
            </h3>

            <ul className="space-y-4 text-lg text-neutral-300">

              <li>✦ Access camera monitoring</li>

              <li>✦ Manage employee enrollment</li>

              <li>✦ View recognition logs</li>

              <li>✦ Configure CCTV systems</li>

            </ul>

            <button
              className="
                mt-12
                px-8
                py-3
                rounded-full
                border
                border-white
                hover:bg-white
                hover:text-black
                transition-all
                duration-300
              "
            >
              Create Account →
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}