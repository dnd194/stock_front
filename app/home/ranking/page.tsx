import { redirect } from "next/navigation"

export default function HomeRankingRedirect() {
  redirect("/ranking/total")
}
