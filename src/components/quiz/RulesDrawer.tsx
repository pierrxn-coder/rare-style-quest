import { ScrollText, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { PromoRules } from "@/components/quiz/PromoRules";

export function RulesDrawer({ label = "Ver regras da promoção" }: { label?: string }) {
  return (
    <Drawer shouldScaleBackground={false}>
      <DrawerTrigger asChild>
        <Button variant="ghostLine" size="touch" className="w-full">
          <ScrollText />
          {label}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[88dvh] border-border bg-surface">
        <DrawerHeader className="relative text-left">
          <DrawerTitle className="text-display text-2xl font-normal leading-tight tracking-normal">Regras da promoção</DrawerTitle>
          <DrawerDescription>Leia antes de participar.</DrawerDescription>
          <DrawerClose asChild>
            <Button variant="ghost" size="icon" className="absolute right-3 top-2 h-11 w-11" aria-label="Fechar regras">
              <X />
            </Button>
          </DrawerClose>
        </DrawerHeader>
        <div className="overflow-y-auto px-4 pb-8">
          <PromoRules />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
