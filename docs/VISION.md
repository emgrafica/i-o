# i-o systems: vision

**i-o systems** (iosys) · https://i-o.systems

## The name

*i-o* carries several meanings, and that's deliberate. Each is a facet of the same idea:

- **Input / Output Systems**: everything a system takes in and gives back
- **Intelligent Operations Systems**: how organisations run
- **Intelligent Organisation Systems**: how organisations are structured
- **Intelligent Organism Systems**: what they become
- **Intellectually Operated Systems**: how they're directed

Public line: **i-o systems: Intelligent Operations Systems**. The other readings are the manifesto behind it.

## The idea

Technical systems and human systems have always been run apart: software in one world, hardware in another, people and organisations in a third. Integration meant point-to-point plumbing between systems that never understood each other or the people using them.

i-o unifies them into **one hybrid, evolving, intelligent system: a cybernetic organism**. People, software, hardware and organisations become parts of a single whole that senses, understands, decides and acts.

## Why now

Generative AI and large language models can now handle both kinds of complexity that kept these worlds apart:

- **Technical complexity**: APIs, schemas, protocols, logs and events across thousands of systems
- **Natural-language complexity**: how people actually describe what they need, what's wrong and what they intend

With both handled by one layer, integrations and physical connectivity that were never possible before become practical: in the workplace, and in society, government, education and industry.

## What i-o offers

Customers consolidate completely different worlds (systems and people, hardware and software) into one organism that they can talk to, that watches over itself, and that acts on their behalf within the rules they set.

Ambition: to be the most capable and flexible systems-integration organisation in the world.

## Principles for the product

1. **One organism, many surfaces.** Portals, chat, mobile, voice, devices and rooms are all surfaces of the same system, not separate products.
2. **Language first.** Anyone can state a need in their own words ("my laptop is broken", "order a monitor for Ana", "why is the Dublin office network slow?"). i-o plans across the connected systems and carries it out. Forms remain as one surface among several.
3. **Connect anything.** Systems of record (ITSM, HR, assets, procurement, identity, knowledge, finance), devices and buildings (IoT, telemetry) and people (teams, roles, expertise) are all reachable through one i-o API.
4. **Sense, then act.** The organism watches events and signals as well as answering requests: it notices, explains, suggests and fixes.
5. **Trust by design.** Every action has an owner, a permission, a reason and an audit trail. Consequential actions need human approval. Customers set the rules for what the organism may do on its own.
6. **Evolves with use.** Every resolved request, decision and correction teaches the organism, within each customer's own boundary.
7. **One design language.** `@i-o/design-system` gives every surface the same calm, monochrome, task-first language, themeable per customer through tokens.

## Architecture in one picture

```
            people · teams · organisations
                         │
   surfaces:   portal · catalog · hub · chat · mobile · voice · devices · rooms
                         │
   ┌──────────────────────────────────────────────────────────┐
   │  i-o intelligence: language ↔ intent ↔ plans ↔ actions   │
   │  (LLMs, agents, policies, approvals, memory, audit)      │
   ├──────────────────────────────────────────────────────────┤
   │  i-o API: one model of the organisation                  │
   │  people · assets · requests · knowledge · catalog ·      │
   │  places · events                                         │
   ├──────────────────────────────────────────────────────────┤
   │  connectors: ITSM · HR · identity · asset · procurement  │
   │  · knowledge · finance · IoT/telemetry · messaging       │
   └──────────────────────────────────────────────────────────┘
                         │
            the customer's systems, hardware and buildings
```

The apps in this repo (`apps/portal`, `apps/catalog`, `apps/hub`) are the first surfaces. They're rebuilt as clients of the i-o API, never wired to a single vendor's backend again.
