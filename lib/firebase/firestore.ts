// lib/firebase/firestore.ts
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  getDocs,
  query,
  deleteDoc,
  QueryConstraint
} from "firebase/firestore";
import { db } from "./config";

function sanitizeForFirestore<T>(value: T): T {
  if (value === undefined || value === null) {
    return value;
  }

  if (value instanceof Date) {
    return value;
  }

  if (Array.isArray(value)) {
    return value
      .filter((item) => item !== undefined)
      .map((item) => sanitizeForFirestore(item)) as T;
  }

  if (typeof value === "object") {
    const cleanedEntries = Object.entries(value as Record<string, unknown>).reduce<Record<string, unknown>>((accumulator, [key, nestedValue]) => {
      if (nestedValue === undefined) {
        return accumulator;
      }

      accumulator[key] = sanitizeForFirestore(nestedValue);
      return accumulator;
    }, {});

    return cleanedEntries as T;
  }

  return value;
}

// Generic types for our data structures
export interface HeroSlide {
  id?: string;
  tag: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  imageUrl: string;
  order: number;
}

export interface StatItem {
  id?: string;
  value: string;
  label: string;
  order: number;
}

export interface StatNumber {
  id?: string;
  value: number;
  suffix: string;
  prefix: string;
  label: string;
  order: number;
}

export interface Pillar {
  id?: string;
  title: string;
  description: string;
  order: number;
}

export interface TimelineEntry {
  id?: string;
  year: string;
  title: string;
  description: string;
  tag: string;
  metric: string;
  imageUrl: string;
  order: number;
}

export interface TeamMember {
  id?: string;
  name: string;
  role: string;
  imageUrl: string;
  order: number;
}

export interface Milestone {
  id?: string;
  year: string;
  event: string;
  order: number;
}

export interface ValueItem {
  id?: string;
  title: string;
  desc: string;
  order: number;
}

export interface OfficeAddress {
  id?: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  order: number;
}

export interface DepartmentEmail {
  id?: string;
  label: string;
  email: string;
  order: number;
}

export interface NavLink {
  id?: string;
  label: string;
  href: string;
  order: number;
}

export interface SocialLink {
  id?: string;
  platform: string;
  handle: string;
  url: string;
  order: number;
}

export interface LegalLink {
  id?: string;
  label: string;
  href: string;
  order: number;
}

export interface GalleryImage {
  id?: string;
  src: string;
  caption: string;
  category: string;
  order: number;
}

export interface HomepageSlideData {
  tag: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  imageUrl: string;
}

export interface HomepageStatData {
  value: string;
  label: string;
}

export interface HomepagePillarData {
  title: string;
  description: string;
}

export interface HomepageData {
  slides: HomepageSlideData[];
  stats: HomepageStatData[];
  pillars: HomepagePillarData[];
  introHeading: string;
  introPara1: string;
  introPara2: string;
  ctaHeading: string;
  ctaBody: string;
}

export interface AboutValueData {
  title: string;
  desc: string;
}

export interface AboutMilestoneData {
  year: string;
  event: string;
}

export interface AboutTeamMemberData {
  name: string;
  role: string;
  imageUrl: string;
}

export interface AboutData {
  pageHeading: string;
  pageSubtitle: string;
  missionHeading: string;
  missionBody: string;
  missionBullets: string[];
  visionHeading: string;
  visionBody: string;
  visionQuote: string;
  values: AboutValueData[];
  milestones: AboutMilestoneData[];
  team: AboutTeamMemberData[];
}

export interface SocialImpactStatData {
  value: number;
  suffix: string;
  prefix: string;
  label: string;
}

export interface SocialImpactTimelineEntryData {
  year: string;
  title: string;
  description: string;
  tag: string;
  metric: string;
  imageUrl: string;
}

export interface SocialImpactData {
  pageHeading: string;
  pageSubtitle: string;
  stats: SocialImpactStatData[];
  timeline: SocialImpactTimelineEntryData[];
  testimonialQuote: string;
  testimonialTranslation: string;
  testimonialAuthor: string;
}

export interface GalleryImageData {
  src: string;
  caption: string;
  category: string;
}

export interface GalleryData {
  pageHeading: string;
  pageSubtitle: string;
  images: GalleryImageData[];
}

export interface ContactOfficeData {
  name: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
}

export interface ContactDepartmentData {
  label: string;
  email: string;
}

export interface ContactSocialLinkData {
  label: string;
  url: string;
}

export interface ContactData {
  pageHeading: string;
  pageSubtitle: string;
  offices: ContactOfficeData[];
  departments: ContactDepartmentData[];
  socialLinks: ContactSocialLinkData[];
}

export interface SiteNavLinkData {
  label: string;
  href: string;
}

export interface SiteFooterSocialData {
  platform: string;
  handle: string;
  url: string;
}

export interface SiteLegalLinkData {
  label: string;
  href: string;
}

export interface SiteSettingsData {
  orgName: string;
  orgTagline: string;
  orgEstYear: string;
  orgEmail: string;
  orgPhone: string;
  navLinks: SiteNavLinkData[];
  footerTagline: string;
  footerAddress: string;
  footerPhone1: string;
  footerPhone2: string;
  footerEmail1: string;
  footerEmail2: string;
  footerSocial: SiteFooterSocialData[];
  legalLinks: SiteLegalLinkData[];
  footerCtaHeading: string;
  footerCtaSubtitle: string;
  siteTitle: string;
  metaDescription: string;
}

export interface ContentDocument<T> {
  data: T;
  updatedAt?: Date;
}

// Generic CRUD operations
export async function getDocument<T>(collectionName: string, docId: string): Promise<T | null> {
  const docRef = doc(db, collectionName, docId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? (docSnap.data() as T) : null;
}

export async function setDocument<T>(collectionName: string, docId: string, data: T): Promise<void> {
  const docRef = doc(db, collectionName, docId);
  await setDoc(docRef, sanitizeForFirestore({ ...data, updatedAt: new Date() }), { merge: true });
}

export async function updateDocument<T>(collectionName: string, docId: string, data: Partial<T>): Promise<void> {
  const docRef = doc(db, collectionName, docId);
  await updateDoc(docRef, sanitizeForFirestore({ ...data, updatedAt: new Date() }));
}

export async function getCollection<T>(collectionName: string, constraints: QueryConstraint[] = []): Promise<T[]> {
  const q = query(collection(db, collectionName), ...constraints);
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as T));
}

export async function addDocument<T>(collectionName: string, data: T, customId?: string): Promise<string> {
  const colRef = collection(db, collectionName);
  const docRef = customId ? doc(colRef, customId) : doc(colRef);
  await setDoc(docRef, { ...data, updatedAt: new Date() });
  return docRef.id;
}

export async function deleteDocument(collectionName: string, docId: string): Promise<void> {
  const docRef = doc(db, collectionName, docId);
  await deleteDoc(docRef);
}

// Specific content getters/setters
export async function getHomepageContent(): Promise<ContentDocument<HomepageData> | null> {
  return getDocument<ContentDocument<HomepageData>>("content", "homepage");
}

export async function updateHomepageContent(data: ContentDocument<HomepageData>): Promise<void> {
  return setDocument<ContentDocument<HomepageData>>("content", "homepage", data);
}

export async function getAboutContent(): Promise<ContentDocument<AboutData> | null> {
  return getDocument<ContentDocument<AboutData>>("content", "about");
}

export async function updateAboutContent(data: ContentDocument<AboutData>): Promise<void> {
  return setDocument<ContentDocument<AboutData>>("content", "about", data);
}

export async function getSocialImpactContent(): Promise<ContentDocument<SocialImpactData> | null> {
  return getDocument<ContentDocument<SocialImpactData>>("content", "socialImpact");
}

export async function updateSocialImpactContent(data: ContentDocument<SocialImpactData>): Promise<void> {
  return setDocument<ContentDocument<SocialImpactData>>("content", "socialImpact", data);
}

export async function getGalleryContent(): Promise<ContentDocument<GalleryData> | null> {
  return getDocument<ContentDocument<GalleryData>>("content", "gallery");
}

export async function updateGalleryContent(data: ContentDocument<GalleryData>): Promise<void> {
  return setDocument<ContentDocument<GalleryData>>("content", "gallery", data);
}

export async function getContactContent(): Promise<ContentDocument<ContactData> | null> {
  return getDocument<ContentDocument<ContactData>>("content", "contact");
}

export async function updateContactContent(data: ContentDocument<ContactData>): Promise<void> {
  return setDocument<ContentDocument<ContactData>>("content", "contact", data);
}

export async function getSiteSettings(): Promise<ContentDocument<SiteSettingsData> | null> {
  return getDocument<ContentDocument<SiteSettingsData>>("content", "siteSettings");
}

export async function updateSiteSettings(data: ContentDocument<SiteSettingsData>): Promise<void> {
  return setDocument<ContentDocument<SiteSettingsData>>("content", "siteSettings", data);
}