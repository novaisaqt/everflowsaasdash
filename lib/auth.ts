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
    .single()

  if (error || !data || !data.tenants) return null

  const tenant = data.tenants as { id: string; name: string }

  return {
    tenantId: tenant.id,
    tenantName: tenant.name,
    role: data.role as Role
  }
}

export async function requireTenant(minRole: Role = 'viewer') {
  const tenant = await getUserTenant()

  if (!tenant) {
    throw new Error('NO_TENANT')
  }

  const order: Role[] = ['viewer', 'manager', 'admin', 'owner']

  if (order.indexOf(tenant.role) < order.indexOf(minRole)) {
    throw new Error('NO_PERMISSION')
  }

  return tenant
}
