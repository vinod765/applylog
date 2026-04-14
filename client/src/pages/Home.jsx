import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { MoveRight, Briefcase, Kanban, BellRing } from "lucide-react"

const features = [
  {
    icon: Briefcase,
    title: "Track Applications",
    description: "Add every job you apply to in seconds. Never lose track of where you applied.",
  },
  {
    icon: Kanban,
    title: "Visualize Your Pipeline",
    description: "See all your applications in a kanban board — from applied to offer.",
  },
  {
    icon: BellRing,
    title: "Stay on Top",
    description: "Always know what stage each application is in and what needs attention.",
  },
]

export default function Home() {
  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 gap-16 items-center lg:grid-cols-2">

          {/* Left — headline */}
          <div className="flex flex-col gap-6">
            <h1 className="text-5xl md:text-7xl max-w-lg tracking-tighter font-semibold leading-tight">
              Track Every Application.{" "}
              <span className="text-gray-400">Land Your Dream Role.</span>
            </h1>

            <p className="text-lg leading-relaxed text-muted-foreground max-w-sm">
              Organize your entire job search in one place. Kanban board, status tracking, and more.
            </p>

            <div className="flex flex-row gap-3">
              <Button size="lg" variant="outline" className="border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-colors duration-150" asChild>
                <Link to="/sign-in">Sign In</Link>
              </Button>
              <Button size="lg" className="gap-2" asChild>
                <Link to="/sign-up">
                  Get Started <MoveRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right — features */}
          <div className="flex flex-col gap-3">
            {features.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="flex gap-5 items-start p-6 rounded-xl bg-muted hover:bg-gray-100 transition-colors duration-150"
              >
                <div className="p-2 rounded-lg bg-background">
                  <Icon className="w-5 h-5 text-gray-700" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{title}</p>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}