"use client";

import { useState } from "react";
import { Info } from "lucide-react";
import {
  EditorSection,
  Field,
  TextInput,
  Textarea,
  UrlInput,
  TwoCol,
  ItemCard,
  AddButton,
  EditorPageHeader,
} from "./AdminUI";

export default function AboutEditor() {
  /* Mission */
  const [missionHeading, setMissionHeading] = useState(
    "To build a world where every farmer is food-secure, financially independent, and socially dignified."
  );
  const [missionBody, setMissionBody] = useState(
    "We pursue this mission by integrating sustainable agricultural practices, inclusive financial services, market access programs, and community-led governance into a single, cohesive development model that scales from one farm to thousands of villages."
  );
  const [missionBullets, setMissionBullets] = useState([
    "Sustainable Farming Models",
    "Financial Inclusion",
    "Market Linkages",
    "Policy Advocacy",
  ]);

  /* Vision */
  const [visionHeading, setVisionHeading] = useState(
    "A prosperous, equitable rural India by 2035"
  );
  const [visionBody, setVisionBody] = useState(
    "We envision a future where the prosperity gap between rural and urban India has closed — where a farmer's child has the same opportunities as a city child, and where the land is cared for as much as the people who depend on it."
  );
  const [visionQuote, setVisionQuote] = useState(
    "Khet se khushhaali tak — From field to flourishing."
  );

  /* Values */
  const [values, setValues] = useState([
    { title: "Compassion First", desc: "Every decision we make is rooted in empathy for the farmer, the family, and the community we serve." },
    { title: "Integrity Always", desc: "Transparent operations, honest reporting, and accountable governance at every level of the organisation." },
    { title: "Community Ownership", desc: "We don't work for communities — we work with them, ensuring they lead their own development journeys." },
    { title: "Innovation & Learning", desc: "Combining traditional farming wisdom with modern research to develop solutions that are practical and scalable." },
  ]);

  /* Milestones */
  const [milestones, setMilestones] = useState([
    { year: "2015", event: "AGRIGO founded in Ludhiana, Punjab with a 12-farmer cooperative." },
    { year: "2016", event: "Launched first organic farming training programme; 200 farmers enrolled." },
    { year: "2017", event: "Expanded to Haryana and Himachal Pradesh. Established mobile health camps." },
    { year: "2019", event: "Crossed 2,000 farmer milestone. Received National Rural Development Award." },
    { year: "2021", event: "Launched women's empowerment vertical — 500 SHGs formed across 3 states." },
    { year: "2023", event: "8 states, 340+ villages, and 12,400+ farmers supported annually." },
  ]);

  /* Team */
  const [team, setTeam] = useState([
    { name: "Rajinder Singh", role: "Founder & Executive Director", imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80&fit=crop" },
    { name: "Priya Mehta", role: "Director — Community Programs", imageUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80&fit=crop" },
    { name: "Dr. Amit Rao", role: "Head of Agricultural Research", imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&fit=crop" },
  ]);

  /* Page header */
  const [pageHeading, setPageHeading] = useState("Rooted in Purpose, Growing with Purpose");
  const [pageSubtitle, setPageSubtitle] = useState(
    "Since 2015, AGRIGO has been a living testament to what happens when communities are trusted, supported, and connected."
  );

  const updateValue = (i: number, key: string, val: string) =>
    setValues((p) => p.map((v, idx) => (idx === i ? { ...v, [key]: val } : v)));
  const addValue = () => setValues((p) => [...p, { title: "New Value", desc: "Description." }]);
  const removeValue = (i: number) => setValues((p) => p.filter((_, idx) => idx !== i));

  const updateMilestone = (i: number, key: string, val: string) =>
    setMilestones((p) => p.map((m, idx) => (idx === i ? { ...m, [key]: val } : m)));
  const addMilestone = () => setMilestones((p) => [...p, { year: "2025", event: "New milestone." }]);
  const removeMilestone = (i: number) => setMilestones((p) => p.filter((_, idx) => idx !== i));

  const updateTeam = (i: number, key: string, val: string) =>
    setTeam((p) => p.map((m, idx) => (idx === i ? { ...m, [key]: val } : m)));
  const addTeamMember = () =>
    setTeam((p) => [...p, { name: "Team Member", role: "Role Title", imageUrl: "" }]);
  const removeTeamMember = (i: number) => setTeam((p) => p.filter((_, idx) => idx !== i));

  const updateBullet = (i: number, val: string) =>
    setMissionBullets((p) => p.map((b, idx) => (idx === i ? val : b)));
  const addBullet = () => setMissionBullets((p) => [...p, "New Point"]);
  const removeBullet = (i: number) => setMissionBullets((p) => p.filter((_, idx) => idx !== i));

  return (
    <div>
      <EditorPageHeader
        icon={Info}
        title="About Page Editor"
        description="Edit all content on the About Us page — mission, vision, values, timeline and team."
      />

      {/* Page Header */}
      <EditorSection title="Page Header" subtitle="The hero banner at the top of the About page">
        <Field label="Main Heading">
          <TextInput value={pageHeading} onChange={setPageHeading} />
        </Field>
        <Field label="Subtitle / Tagline">
          <Textarea value={pageSubtitle} onChange={setPageSubtitle} rows={2} />
        </Field>
      </EditorSection>

      {/* Mission */}
      <EditorSection title="Mission Statement" subtitle="The large left card in the Mission/Vision grid">
        <Field label="Mission Headline">
          <Textarea value={missionHeading} onChange={setMissionHeading} rows={2} />
        </Field>
        <Field label="Mission Body">
          <Textarea value={missionBody} onChange={setMissionBody} rows={3} />
        </Field>
        <Field label="Checklist Items">
          <div className="space-y-2">
            {missionBullets.map((b, i) => (
              <div key={i} className="flex gap-2">
                <input
                  type="text"
                  value={b}
                  onChange={(e) => updateBullet(i, e.target.value)}
                  className="flex-1 px-3.5 py-2 bg-[#0A1A10] border border-[#2D6A4F]/25 rounded-lg text-white text-sm placeholder-[#52B788]/25 focus:outline-none focus:border-[#52B788]/50 transition-all"
                />
                {missionBullets.length > 1 && (
                  <button onClick={() => removeBullet(i)} className="text-red-500/40 hover:text-red-400 px-2">✕</button>
                )}
              </div>
            ))}
            <AddButton onClick={addBullet} label="Add Checklist Item" />
          </div>
        </Field>
      </EditorSection>

      {/* Vision */}
      <EditorSection title="Vision Statement" subtitle="The right tall card in the Mission/Vision grid">
        <Field label="Vision Heading">
          <TextInput value={visionHeading} onChange={setVisionHeading} />
        </Field>
        <Field label="Vision Body">
          <Textarea value={visionBody} onChange={setVisionBody} rows={3} />
        </Field>
        <Field label="Founding Quote">
          <TextInput value={visionQuote} onChange={setVisionQuote} />
        </Field>
      </EditorSection>

      {/* Values */}
      <EditorSection title="Core Values" subtitle="The 4-card values grid">
        <div className="space-y-3">
          {values.map((v, i) => (
            <ItemCard key={i} index={i} total={values.length} onRemove={() => removeValue(i)} label="Value">
              <Field label="Value Title">
                <TextInput value={v.title} onChange={(val) => updateValue(i, "title", val)} />
              </Field>
              <Field label="Value Description">
                <Textarea value={v.desc} onChange={(val) => updateValue(i, "desc", val)} rows={2} />
              </Field>
            </ItemCard>
          ))}
          <AddButton onClick={addValue} label="Add Value" />
        </div>
      </EditorSection>

      {/* Milestones */}
      <EditorSection title="Journey Milestones" subtitle="The decade timeline on the About page">
        <div className="space-y-3">
          {milestones.map((m, i) => (
            <ItemCard key={i} index={i} total={milestones.length} onRemove={() => removeMilestone(i)} label="Milestone">
              <TwoCol>
                <Field label="Year">
                  <TextInput value={m.year} onChange={(v) => updateMilestone(i, "year", v)} placeholder="2019" />
                </Field>
                <Field label="Event Description">
                  <TextInput value={m.event} onChange={(v) => updateMilestone(i, "event", v)} placeholder="What happened..." />
                </Field>
              </TwoCol>
            </ItemCard>
          ))}
          <AddButton onClick={addMilestone} label="Add Milestone" />
        </div>
      </EditorSection>

      {/* Team */}
      <EditorSection title="Leadership Team" subtitle="Team member cards displayed at the bottom of the About page">
        <div className="space-y-3">
          {team.map((member, i) => (
            <ItemCard key={i} index={i} total={team.length} onRemove={() => removeTeamMember(i)} label="Member">
              <TwoCol>
                <Field label="Full Name">
                  <TextInput value={member.name} onChange={(v) => updateTeam(i, "name", v)} />
                </Field>
                <Field label="Role / Title">
                  <TextInput value={member.role} onChange={(v) => updateTeam(i, "role", v)} />
                </Field>
              </TwoCol>
              <Field label="Photo URL">
                <TextInput value={member.imageUrl} onChange={(v) => updateTeam(i, "imageUrl", v)} placeholder="https://images.unsplash.com/..." />
              </Field>
              {member.imageUrl && (
                <img src={member.imageUrl} alt={member.name} className="w-16 h-16 rounded-xl object-cover mt-1 border border-[#2D6A4F]/20" />
              )}
            </ItemCard>
          ))}
          <AddButton onClick={addTeamMember} label="Add Team Member" />
        </div>
      </EditorSection>
    </div>
  );
}