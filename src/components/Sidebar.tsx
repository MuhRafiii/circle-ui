import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export function Sidebar() {
  const { theme } = useTheme();
  const { logout } = useAuth();
  return (
    <aside className="w-full min-h-screen flex flex-col justify-between p-4 space-y-4 border-r text-start">
      <div className="space-y-6">
        <nav className="space-y-6 px-4">
          <h2 className="text-5xl font-semibold text-green-500 mb-6">circle</h2>
          <Link
            to="/"
            className="flex items-center hover:text-gray-300 text-sm"
          >
            {theme === "dark" ? (
              <img
                className="w-5 h-5 mr-3"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAABU0lEQVR4nO3Yv0oDQRDH8YloEATBwsJGGwttRJ8gvZ1iY6WVr+Ar+AoBCztLO8U/nS8gaWzE6rBTEIQkSvzKwYLCcfGy2budI/OBbQKZnd/t3JGciDGmFEALeHarJXUCHAGf/PoCjoGGaAbMAmfkOwfmRCNgFejwv0dgXTQBtoE3insHdjQ03nCzPWB038AJMBWr+XnggvFdAgtVN7/mZjmUJ2Cjqub3gQ/C6wKHZTY+7Wa2bG1gJnTzi8Ad1bkHlkI1vwUkVC9J9x63+c0Rn++hvXrf3G7mH4iv43VPpE8E9DjwCXCNHlc+AV7QI/EJ4PP7piwDnwCqiAWITOwEIhM7gQk6gS5w6v47/F3pZ706BNgdUnOvDgGaQ2o21QeQSHUzLEAOO4GibIRy2AhN0gj1PfbpxaqbAdx6bHQTq24GsJJ+seAV67vXMMux6hpjpJ5+ANIc0C46l76aAAAAAElFTkSuQmCC"
                alt="home"
              />
            ) : (
              <img
                className="w-5 h-5 mr-3"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAABaklEQVR4nO2Yv0rDUBSHv4oWoSA4OLjo4qCL6BO4uykuTnbyFXwFX0FwcHPspvhn8wWki4s4FTcFQbBV6pHACYSWxuQ2yb2B88EPSqAn37k5t/QGDMMoix3gRRN9rhXHwDcgmh/gBGgQOPPARUJ8NJdAi0BZA7op8nGegA0CYxd4zyAf5wPYIwAaOtvDHPJxfoFTYMaX/ALQcRAfzRWwWLX8us6yFJRnYLMq+UPgs0B50XwB7TLFZ3VmpeScAXNFyy8B9xXIi+YBWC5KfhvoVSgvmp7eeyq2cv6+F523aTZ3NPOPHuVF03XdE+0A5EVz5NLATQDiorl2aeA1AHFJbOjcuPy/KStDlwYksOTGt7BYA/hfdbERwv/Ki21i8h9MzvXskEx0rV+HJ7CfUvOgDg00U2o269DAf1gDWbEnMAEboazYCE3ARigrA4fV6nusO8adw41uPdYdY1W/mGXFBvoaZsVjXcMwqCF/128TQ2r3qyYAAAAASUVORK5CYII="
                alt="home"
              />
            )}
            Home
          </Link>
          <Link
            to="/search"
            className="flex items-center hover:text-gray-300 text-sm"
          >
            {theme === "dark" ? (
              <img
                className="w-5 h-5 mr-3"
                src="data:image/png;base64,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"
                alt="external-finding-the-suitable-candidate-for-perfect-role-classic-light-tal-revivo"
              />
            ) : (
              <img
                className="w-5 h-5 mr-3"
                src="data:image/png;base64,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"
                alt="external-finding-the-suitable-candidate-for-perfect-role-classic-light-tal-revivo"
              />
            )}
            Search
          </Link>
          <Link
            to="/follows"
            className="flex items-center hover:text-gray-300 text-sm"
          >
            {theme === "dark" ? (
              <img
                className="w-5 h-5 mr-3"
                src="data:image/png;base64,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"
                alt="like--v1"
              />
            ) : (
              <img
                className="w-5 h-5 mr-3"
                src="data:image/png;base64,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"
                alt="like--v1"
              />
            )}
            Follows
          </Link>
          <Link
            to="/follows"
            className="flex items-center hover:text-gray-300 text-sm"
          >
            {theme === "dark" ? (
              <img
                className="w-5 h-5 mr-3"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAABs0lEQVR4nN2US04CURBFaQgmqMx0yMiABtiEbkBExCWoQUX3oAPQNejEOHIpxv8HgzIwcQNo/IyOqVjPVNqmGxlSSSWdW/Xqvr6vqmKxoTZgBFgGjoEW8KbeUqwqOYMWXwSeiLZHoPyfwglg3xS4AupAARhTLyh2bfL2gHg/BK74J7DmDgEekFP3zGVqwJeeafYjiys+a/Bp4NLc9lyITHzOkJTCHtRpvmrwOHCh+LO6I/FM3rri7cCH125xmv9qyY8krnhK3ZHYvxC5bhRfCiKQthOr+/BcCEHWl7ut+FEQwYMG8z7cUzn8Ep1ZiTS3qLFWEEFXg+mAWM6QuOLZgLy0xrthBKk/wVhwmwbkjIYROIlmYgMakA+TyD1yzWCT0rLACdAB3tU7iq0AEyZ/I+yRq6ZN5Vd3gQ+iTQh3dIW41VHpNWiyuMRezEQfyHQCU2YXyfcCcKg59owMWrKXhmVzs1Mg04fuGc11Nh91QLYiuls2ZUJDchO6Vd0eakRdyO2eprnRLbClQzSuXtSpvTN5jb7WtSEqqZ5R1o6UJYQkKYtL2g64B17V5VuwSs8HHRr7BqCuxc14jg2uAAAAAElFTkSuQmCC"
                alt="user-male-circle"
              />
            ) : (
              <img
                className="w-5 h-5 mr-3"
                src="data:image/png;base64,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"
                alt="user-male-circle"
              />
            )}
            Profile
          </Link>
        </nav>
        <Button className="w-full dark:text-white hover:bg-green-600 bg-green-500 rounded-full">
          <Link to="/">Create Post</Link>
        </Button>
      </div>
      <Link
        to="/login"
        onClick={logout}
        className="flex p-4 items-center hover:text-gray-300 text-sm"
      >
        {theme === "dark" ? (
          <img
            className="w-5 h-5 mr-3"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB/0lEQVR4nO2bS07DMBCGnW6Acg64DAW2paWcoQ8QbJCyLPsi+qBsEFyKwpYdcIMPWXElKwRUFEey4/mkWWY082fGiV9KCYIgCG4AdoFjYAhcemQD4AhoVpV4AlwAX/jNJzDS8bpMvgE8ExZPzkQge/M2K2AGjD2ymYnLZuiq5+2yXwBbykN0XMAy1w7Nsk71wLLmxdfkcyK8WjG3yjo8t5zdqQAw7eCmDYDUcpaqAHAaMyIAUgFIC8Q9BvQsZ6cqQgEaOnFjDRUAIQ7cThEBkApI/9UCZHP9LnDidB4dQgWQJT+1HuioWATgZ/KatopBAIqTn0bRAmTJ3+aSX4TynS8lADVP/k8BiCD5XwUgkuQLBaB4wHsHrjzY0NArzvtVC9DBb1ZVC9AlcgGSghb4AG482NC4BvYqFUBjRJjkRLiPYhBcE4sIm/wITeoswqa/wpO6iiCTIcpNhzsq8gWRtoptTZBMhLax+q8H1B0RAKmA1PXWWM9YI8a9wTPLWU8FgJwQQY7IpC5bIA3tmyoVgFRA6rIFRpazmQoAYG7FPCjr7NBytgrgqOw28GbFfFDWYdMcOl6z9FUEk/xDbuF3x4Vjuw0wh5FnHmyq2DbPvXlN35WyibmAEBKPrm+NJOaekN0OPqLLvl/ZugbZmHBoLimNPTIdT8tJzwuCIKga8Q1kKAI7hcdWJwAAAABJRU5ErkJggg=="
            alt="box-move-left"
          />
        ) : (
          <img
            className="w-5 h-5 mr-3"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAACBklEQVR4nO2bTU7DMBCFP3cDlHPAZYCyLf3hDJRSwQapS9gX0bSUDYJLUdiyK9ygyJIrWVZoqeJIdjxPGimbjGZe5jnOeAICgUAg8IZ94BS4BK4Dsh7QAOqUBAUMgB9gGbB9A30TrzfUgLcAktvGXn2SMHCcz4EMuAvIMhOXHaeWqRfN22U/BXYIEzqumSOHelGnDcvhe8DJr6Dj+7BiPi7q8Mpy9kgcyHzKYGg509cxwGvMQyEAqYClSIB014Cu5axDggTUTOIdcx0DYly4vUIIQCqArSSggDZw5vs7OoYKUMDYuqFFQgQoJ3ltTRIhQOUkP05FAgp4cJKfRvSeL0SAqnjyawlQCST/JwEqkeRzCVA5C94XcBPAgYbuOB+WTUArgD79OpuXTUA7dQJUjgQWwH0ABxq3wEHZBKxIGDkkPKWyCKZGwsaN0KjiJPxrKzyqMAnyMcSGClgh7+2QVD8gj4Rk+gEuCU1jSfQDqg4hAKkAvEmgZs4HuxHtE7xWwLnlTJMQA2RCBI8VMIxwQRECkApAJIAn2fatctIDiDFgYsXcK+rsxGlehj4quwt8WjEfFXVYN0PHK4ezgEnQyT87jd89H45tGSzNMHIWwKGKbRPnyWu7wBOU+QFhGZG9+P60V2by2pZDiLYwT760vkbdLIy9AA5VbOuZfwO8aF4gEAioCn4Bqx2AInxorTkAAAAASUVORK5CYII="
            alt="box-move-left"
          />
        )}
        Logout
      </Link>
    </aside>
  );
}
