import type { ComponentType } from "react";
import {
  Boxes,
  Cloud,
  Cpu,
  Database,
  GitBranch,
  Network,
  Server,
  Terminal,
  Activity,
  Layers,
} from "lucide-react";
import {
  SiKubernetes,
  SiDocker,
  SiPytorch,
  SiTensorflow,
  SiTerraform,
  SiPrometheus,
  SiGrafana,
  SiGo,
  SiPython,
  SiTypescript,
  SiJavascript,
  SiRedis,
  SiApachekafka,
  SiPostgresql,
  SiMysql,
  SiHelm,
  SiGooglecloud,
  SiOpentelemetry,
  SiOpenai,
  SiLinux,
  SiGnubash,
  SiApacheairflow,
  SiNvidia,
  SiRay,
  SiGithubactions,
  SiArgo,
} from "react-icons/si";

type IconType = ComponentType<{ size?: number; className?: string }>;

// Map (lowercased) tech names → an icon. Brand logos where they exist,
// otherwise a sensible generic icon so everything has a glyph.
const ICONS: Record<string, IconType> = {
  kubernetes: SiKubernetes,
  k8s: SiKubernetes,
  docker: SiDocker,
  pytorch: SiPytorch,
  tensorflow: SiTensorflow,
  terraform: SiTerraform,
  prometheus: SiPrometheus,
  grafana: SiGrafana,
  go: SiGo,
  golang: SiGo,
  python: SiPython,
  typescript: SiTypescript,
  javascript: SiJavascript,
  redis: SiRedis,
  kafka: SiApachekafka,
  postgresql: SiPostgresql,
  postgres: SiPostgresql,
  mysql: SiMysql,
  helm: SiHelm,
  gcp: SiGooglecloud,
  "google cloud": SiGooglecloud,
  opentelemetry: SiOpentelemetry,
  openai: SiOpenai,
  linux: SiLinux,
  bash: SiGnubash,
  airflow: SiApacheairflow,
  ray: SiRay,
  kubeflow: Layers,
  argocd: SiArgo,
  "github actions": SiGithubactions,
  cuda: SiNvidia,
  "cuda basics": SiNvidia,
  gpu: SiNvidia,
  nvidia: SiNvidia,

  // Generic fallbacks for concepts without a brand logo
  aws: Cloud,
  cloud: Cloud,
  "vllm / tgi": Cpu,
  vllm: Cpu,
  llms: Cpu,
  "model serving / inference": Server,
  "distributed training": Network,
  "gpu scheduling": Cpu,
  "vector databases": Database,
  sql: Database,
  "parquet / s3": Database,
  s3: Database,
  slos: Activity,
  "on-call / incident response": Activity,
  "ai ops": Layers,
  mlops: Layers,
};

function pickIcon(name: string): IconType {
  const key = String(name ?? "").trim().toLowerCase();
  if (ICONS[key]) return ICONS[key];
  // light heuristics for unmapped items
  if (/cloud|aws|azure/.test(key)) return Cloud;
  if (/data|db|sql|store|parquet|s3/.test(key)) return Database;
  if (/gpu|cuda|nvidia|infer|serv/.test(key)) return Cpu;
  if (/train|distribut|network|cluster/.test(key)) return Network;
  if (/git|ci|cd|pipeline/.test(key)) return GitBranch;
  if (/shell|bash|cli/.test(key)) return Terminal;
  return Boxes;
}

export function TechBadge({
  name,
  emphasis = false,
}: {
  name: string;
  emphasis?: boolean;
}) {
  const Icon = pickIcon(name);
  if (emphasis) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-md border border-[color:var(--color-accent)]/35 bg-[color:var(--color-accent-soft)] px-2.5 py-1 text-xs font-semibold text-[color:var(--color-accent-strong)]">
        <Icon size={13} className="shrink-0" />
        {name}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border bg-[color:var(--color-canvas)] px-2 py-0.5 text-xs text-[color:var(--color-ink)]/80">
      <Icon size={13} className="shrink-0 text-[color:var(--color-accent)]" />
      {name}
    </span>
  );
}

export function TechIcon({ name, size = 14 }: { name: string; size?: number }) {
  const Icon = pickIcon(name);
  return <Icon size={size} className="text-[color:var(--color-accent)]" />;
}
