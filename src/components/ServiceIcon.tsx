import {
  Activity,
  BatteryCharging,
  CircleDot,
  Disc3,
  Droplets,
  PaintBucket,
  ScanLine,
  Snowflake,
  Truck,
  Wrench,
  type LucideProps,
} from "lucide-react";
import type { ServiceIcon as IconName } from "@/lib/site";

const map = {
  wrench: Wrench,
  brake: Disc3,
  suspension: Activity,
  scan: ScanLine,
  ac: Snowflake,
  tyre: CircleDot,
  wash: Droplets,
  paint: PaintBucket,
  tow: Truck,
  battery: BatteryCharging,
} satisfies Record<IconName, React.ComponentType<LucideProps>>;

export default function ServiceIcon({ name, ...props }: { name: IconName } & LucideProps) {
  const Icon = map[name];
  return <Icon aria-hidden {...props} />;
}
