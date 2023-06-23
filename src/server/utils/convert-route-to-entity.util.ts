const mapping: Record<string, string> = {
  'data-imports': 'data_import',
  files: 'file',
  organizations: 'organization',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
