import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] items-center bg-ink pt-32 text-cream">
      <div className="container-site">
        <p className="eyebrow text-brass">404</p>
        <h1 className="display-xl mt-4">This plate is empty.</h1>
        <Link href="/" className="btn-light mt-10">Back to Home</Link>
      </div>
    </section>
  );
}
