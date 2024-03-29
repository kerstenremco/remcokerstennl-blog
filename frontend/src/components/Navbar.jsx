export default function NavBar(props) {
  return (
    <>
      <div class="navbar bg-base-100">
        <div class="flex-1">
          <a class="btn btn-ghost text-xl max-xl:hidden" href="/">
            Remco Kersten
          </a>
        </div>
        <div class="flex-none">
          <ul class="menu menu-horizontal px-1">
            <li className="max-xl:hidden">
              <a href="/posts">
                <box-icon name="category" type="solid" class="fill-base-content"></box-icon>Posts
              </a>
            </li>

            <li className="max-xl:hidden" onClick={() => document.getElementById("contact_modal").showModal()}>
              <a>
                <box-icon name="envelope" type="solid" class="fill-base-content"></box-icon>
              </a>
            </li>
          </ul>
          <box-icon type="solid" name="moon" class="fill-primary"></box-icon>
          <input
            id="theme-switch"
            data-toggle-theme="emerald,dracula"
            data-act-class="ACTIVECLASS"
            type="checkbox"
            class="toggle"
          />
          <box-icon type="solid" name="sun" class="fill-primary"></box-icon>
        </div>
      </div>
      <div class="btm-nav z-50 xl:hidden">
        <a href="/">
          <button>
            <box-icon type="solid" name="upside-down" class="fill-base-content"></box-icon>
          </button>
        </a>
        <a href="/posts">
          <button>
            <box-icon type="solid" name="category" class="fill-base-content"></box-icon>{" "}
          </button>
        </a>
        <a href="#" onClick={() => document.getElementById("contact_modal").showModal()}>
          <button>
            <box-icon type="solid" name="envelope" class="fill-base-content"></box-icon>{" "}
          </button>
        </a>
      </div>
    </>
  );
}
