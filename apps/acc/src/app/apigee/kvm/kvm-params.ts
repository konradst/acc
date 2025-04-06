import { Api } from '../api/api';
import { Environment } from '../environment/environment';
import { Organization } from '../organization/organization';

export interface KvmParams {
  organizationName: Organization['organization'];
  apiName?: Api['name'];
  environmentName?: Environment['environment'];
}
