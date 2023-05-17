import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div class="pageNotFound">
      <div data-glitch="Page not Found!" class="glitch">
        Page not Found!
      </div>
      <p>
        Go to the <Link to="/">Homepage</Link>.
      </p>
    </div>
  );
}
