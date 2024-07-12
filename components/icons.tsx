import { unlink } from 'fs';
import { ComponentProps } from "react";
import {
    AlertTriangle,
    AreaChart,
    ArrowRight,
    Check,
    ChevronLeft,
    ChevronRight,
    CircuitBoardIcon,
    Command,
    CreditCard,
    Database,
    DatabaseZap,
    File,
    FilePlus,
    FileText,
    HelpCircle,
    Image,
    Laptop,
    LayoutDashboardIcon,
    Loader2,
    LogIn,
    LucideIcon,
    LucideProps,
    Moon,
    MoreVertical,
    Network,
    Pizza,
    Copyright,
    Plus,
    Settings,
    SunMedium,
    Trash,
    Twitter,
    Unlink,
    User,
    User2Icon,
    UserX2Icon,
    X
  } from 'lucide-react';
  
  export type Icon = LucideIcon;
  
  export const Icons = {
    dashboard: LayoutDashboardIcon,
    logo: Command,
    login: LogIn,
    close: X,
    profile: User2Icon,
    links: Unlink,
    chart: AreaChart,
    source: Database,
    spinner: Loader2,
    kanban: CircuitBoardIcon,
    chevronLeft: ChevronLeft,
    chevronRight: ChevronRight,
    trash: Trash,
    employee: UserX2Icon,
    post: FileText,
    sources: DatabaseZap,
    file: FilePlus,
    page: File,
    media: Image,
    network: Network,
    copyright: Copyright,
    settings: Settings,
    billing: CreditCard,
    ellipsis: MoreVertical,
    add: Plus,
    warning: AlertTriangle,
    user: User,
    arrowRight: ArrowRight,
    help: HelpCircle,
    pizza: Pizza,
    Settings: Settings,
    sun: SunMedium,
    moon: Moon,
    laptop: Laptop,
    google: ({ ...props }: LucideProps) => (
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" {...props}>
      <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z">
      </path>
      <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z">
      </path>
      <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34A21.991 21.991 0 0 0 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z">
      </path>
      <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z">
      </path>
      <path fill="none" d="M2 2h44v44H2z">
      </path>
      </svg>
    ),
    gitHub: ({ ...props }: LucideProps) => (
      <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="fab"
        data-icon="github"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 496 512"
        {...props}
      >
        <path
          fill="currentColor"
          d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
        ></path>
      </svg>
    ),
    twitter: Twitter,
    check: Check
  };

  export function MoonIcon(props: ComponentProps<"svg">) {
    return (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M14.5565 8.78375C14.0483 8.91874 13.5246 8.98706 12.9988 8.987C11.3975 8.987 9.89375 8.3645 8.76425 7.235C8.02254 6.48901 7.4893 5.56165 7.21769 4.54535C6.94608 3.52905 6.94559 2.45931 7.21625 1.44275C7.25006 1.31565 7.24984 1.1819 7.21563 1.05491C7.18142 0.927914 7.11442 0.812151 7.02134 0.719229C6.92827 0.626307 6.8124 0.559494 6.68535 0.525492C6.5583 0.491489 6.42455 0.491493 6.2975 0.525502C5.02487 0.86464 3.8638 1.53247 2.93075 2.462C0.00725371 5.3855 0.00725371 10.1443 2.93075 13.0693C3.62565 13.768 4.45223 14.322 5.36266 14.6992C6.27309 15.0764 7.24928 15.2693 8.23475 15.2668C9.21996 15.2695 10.1959 15.0768 11.1061 14.6997C12.0163 14.3226 12.8426 13.7687 13.5373 13.07C14.4675 12.1368 15.1356 10.9751 15.4745 9.70175C15.5082 9.57471 15.5079 9.44105 15.4737 9.31414C15.4395 9.18724 15.3726 9.07153 15.2797 8.9786C15.1867 8.88566 15.071 8.81875 14.9441 8.78456C14.8172 8.75037 14.6835 8.75009 14.5565 8.78375V8.78375ZM12.4775 12.0095C11.9217 12.5683 11.2606 13.0114 10.5325 13.313C9.80437 13.6146 9.02364 13.7689 8.2355 13.7668C7.4471 13.7687 6.66612 13.6144 5.93775 13.3126C5.20937 13.0108 4.54804 12.5677 3.992 12.0088C1.6535 9.6695 1.6535 5.8625 3.992 3.52325C4.44388 3.07188 4.96558 2.69631 5.537 2.411C5.45336 3.4903 5.60372 4.57493 5.9778 5.59077C6.35188 6.60661 6.94086 7.52972 7.7045 8.297C8.4701 9.06303 9.39294 9.65365 10.4092 10.028C11.4255 10.4024 12.5109 10.5516 13.5905 10.4653C13.3036 11.0357 12.928 11.557 12.4775 12.0095V12.0095Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  export function SunIcon(props: ComponentProps<"svg">) {
    return (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path d="M4.24475 8C4.24475 10.0707 5.92925 11.7552 8 11.7552C10.0707 11.7552 11.7552 10.0707 11.7552 8C11.7552 5.92925 10.0707 4.24475 8 4.24475C5.92925 4.24475 4.24475 5.92925 4.24475 8ZM8 5.74475C9.2435 5.74475 10.2552 6.7565 10.2552 8C10.2552 9.2435 9.2435 10.2552 8 10.2552C6.7565 10.2552 5.74475 9.2435 5.74475 8C5.74475 6.7565 6.7565 5.74475 8 5.74475ZM7.2485 13.25H8.7485V15.5H7.2485V13.25ZM7.2485 0.5H8.7485V2.75H7.2485V0.5ZM0.498497 7.25H2.7485V8.75H0.498497V7.25ZM13.2485 7.25H15.4985V8.75H13.2485V7.25ZM2.16425 12.7722L3.75425 11.1807L4.8155 12.2413L3.2255 13.8327L2.16425 12.7722ZM11.18 3.758L12.7715 2.1665L13.832 3.227L12.2405 4.8185L11.18 3.758ZM3.7565 4.81925L2.165 3.22775L3.22625 2.16725L4.81625 3.75875L3.7565 4.81925ZM13.832 12.773L12.7715 13.8335L11.18 12.242L12.2405 11.1815L13.832 12.773Z" />
      </svg>
    );
  }
  