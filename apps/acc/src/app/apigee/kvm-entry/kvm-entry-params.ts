import { Kvm } from '../kvm/kvm';
import { KvmParams } from '../kvm/kvm-params';

export interface KvmEntryParams extends KvmParams {
  kvmName: Kvm['name'];
  nextPageToken?: string;
}
