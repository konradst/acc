export interface Organization {
  organization: string;
  projectId: string;
  projects: Organization['projectId'][];
}
