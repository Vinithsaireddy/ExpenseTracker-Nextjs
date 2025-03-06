"use client"

import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card"
import { Button } from "@/components/ui/button"

export default function SettingsPage() {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <Button variant="ghost">⚙️ Settings</Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <p>Theme Settings</p>
      </HoverCardContent>
    </HoverCard>
  )
}
