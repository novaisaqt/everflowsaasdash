import { currentUser } from '@clerk/nextjs/server'
import { supabaseAdmin } from './supabase'

export type Role = 'owner' | 'admin' | 'manager' | 'viewer'

export async function getCurrentUser() {
  const user = await currentUser()
  if (!user) return null

  return {
    id: user.id,
    email: user.emailAddresses?.[0]?.emailAddress ?? null,
    name: user.fullName ?? 'User'
  }
}

export async function getUserTenant() {
  const user = await getCurrentUser()
  if (!user) return null

  const { data, error } = await supabaseAdmin
    .from('tenant_memberships')
    .select('role, tenants ( id, name )')
    .eq('user_id', user.id)
    .limit(1)
    .maybeSingle()

  if (error || !data || !data.tenants) return null

  // FIX: Normalise tenants whether it's an object or array
  const tenantRecord = Array.isArray(data.tenants)
    ? data.tenants[0]
    : data.tenants

  if (!tenantRecord) return null

  return {
    tenantId: tenantRecord.id,
    tenantName: tenantRecord.name,
    role: data.role as Role,
  }
}
