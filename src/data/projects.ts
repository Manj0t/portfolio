import type { Project } from '../types';

/**
 * Featured work, in display order.
 * To add a project, append an object here. Nothing else needs to change.
 */
export const projects: Project[] = [
  {
    id: 'meridiem',
    title: 'Meridiem',
    status: 'live',
    statusLabel: 'Live',
    tagline:
      'An SMS follow-up platform for small businesses that answers inbound leads without ever letting the language model touch the send button.',
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'Twilio', 'Redis', 'Pydantic', 'WebSockets'],
    bodyHtml: [
      'Meridiem texts back leads that arrive after hours, qualifies them, and hands off to a person when it should. One FastAPI backend serves every business on the platform. It validates Twilio webhook signatures, routes each inbound message to the company that owns the number, and drops duplicate provider events so a carrier retry never double texts a customer.',
      'The decision I care most about is that <strong>the model never sends anything itself</strong>. The LLM returns a typed decision that Pydantic validates, and ordinary application code decides whether to send, whether the lead changes stage, and whether a human takes over. If the model returns something malformed or the API call fails, the lead escalates to a person instead of a bad message going out. STOP and emergency keywords are matched in code before the model is ever called.',
      "Staff access is scoped across owner, admin, and staff roles with invite-based signup and mandatory two-factor login, and each company's dashboard streams live conversations over authenticated WebSockets.",
    ],
    links: [
      { label: 'Visit site', href: 'https://meridiemflow.com', primary: true },
      { label: 'Source', href: 'https://github.com/roecand/ai-lead-followup-python' },
    ],
    openByDefault: true,
  },

  {
    id: 'fomo',
    title: 'FOMO',
    status: 'live',
    statusLabel: 'On the App Store',
    tagline:
      "An event discovery app that won UNLV's senior design competition. The only recommendation system I have had to make fast twice.",
    stack: ['Python', 'TypeScript', 'PyTorch', 'PostgreSQL', 'pytest'],
    bodyHtml: [
      'FOMO is an event discovery app built by a team of eleven, now live with over a hundred installs. I owned the recommendation system end to end, which meant the data layer, the retrieval model, and the ranking on top of it. A two tower retrieval model scores events against a three slice user weight vector, and a multi signal re-ranker orders what comes back.',
      "The first version recomputed every user's weight vector from scratch. It took over thirty seconds and put us past our platform usage limits. I rewrote it to apply <strong>incremental deltas</strong> only for the users whose interactions had actually changed, tracking previous interaction state so that status toggles stayed correct.",
      'Proving the two paths equivalent is what turned up the real problem. A non-linear activation made the stored weights non-additive, so deltas could not simply be summed. Moving that activation from write time to recommendation time fixed it. Recomputation dropped to under a second and the pipeline now runs every fifteen minutes inside quota.',
    ],
    aside: {
      heading: 'Why it matters to me.',
      text: 'The interesting engineering was not the model. It was discovering that an optimization I had already shipped was quietly wrong, and being able to prove it.',
    },
    links: [{ label: 'Source', href: 'https://github.com/Fomo-Find-Out-More-Often/fomo' }],
  },

  {
    id: 'freight-reader',
    title: 'Freight document reader',
    status: 'wip',
    statusLabel: 'In progress',
    tagline:
      'Fine-tuning a vision language model to read trucking paperwork so nobody has to retype it into a portal by hand.',
    stack: ['Python', 'PyTorch', 'VLM fine-tuning', 'Chrome extension'],
    bodyHtml: [
      'My family runs a trucking operation, and every load comes with a rate confirmation PDF whose fields get retyped by hand into several pages of a factoring portal. Every broker formats theirs differently, so template matching does not survive contact with the real corpus.',
      'I am fine-tuning a vision language model on the documents we already have and building a Chrome extension that fills the portal from an upload. It is the thing I am actively working on right now, so there is no finished write-up yet.',
    ],
    aside: {
      heading: 'Why this one.',
      text: 'It has a real user, a real recurring workflow, and a real document corpus with all the format drift that implies. That is rarer in a side project than it sounds.',
    },
    links: [],
  },

  {
    id: 'minecraft-rl',
    title: 'Minecraft RL bridge',
    status: 'archived',
    statusLabel: 'Archived',
    tagline:
      'A reinforcement learning pipeline spanning two runtimes. The infrastructure worked. The agent never got good.',
    stack: ['Java', 'Python', 'PyTorch', 'Protobuf', 'Fabric'],
    bodyHtml: [
      'I wanted to train an agent to do tasks in Minecraft, which meant getting a Java game client and a Python learner to talk to each other in real time. A custom Fabric mixin mod streams entity, inventory, and block state over Protobuf sockets into a PPO actor-critic trainer I wrote from scratch in PyTorch against a shared schema.',
      'The pipeline works. State and actions move between the two processes fast enough to step the environment in real time, which is the part I set out to build and the part I would do again.',
      'The agent itself never converged on anything useful. Rewards were too sparse, there was no long-horizon planning, and one run settled on a degenerate policy where it simply never jumped.',
    ],
    aside: {
      heading: 'Listed on purpose.',
      text: 'Building the bridge taught me more about both runtimes than a working agent would have, and I would rather say what happened than let the title imply otherwise.',
    },
    links: [{ label: 'Source', href: 'https://github.com/Manj0t/MinecraftAIMod' }],
  },
];
