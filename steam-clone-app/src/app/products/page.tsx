import { Card } from "@/components/Card";

export default function Products() {
  return (
    <div className="bg-slate-800 min-h-screen">
      <div className="flex justify-center p-4 items-center">
        <div className="input input-bordered  w-[85%] h-[50px] input-sm">
          <form action="" method="get" className="flex items-center justify-start mt-2">
            <input
              type="search"
              name="search"
              placeholder="Search"
              //   onChange={(e) => setSearch(e.target.value)}
            />
          </form>
        </div>
      </div>
      <div className="flex flex-wrap justify-center mx-auto gap-4 p-4">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>

      <footer className="footer bg-neutral text-neutral-content p-10">
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </footer>
    </div>
  );
}
