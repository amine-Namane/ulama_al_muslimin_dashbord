import { getRouteApi } from '@tanstack/react-router'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { RoleDialogs } from '@/features/roles/components/roles-dialogs'
import { UsersPrimaryButtons } from '@/features/roles/components/users-primary-buttons'
import { RoleProvider } from '@/features/roles/components/roles-provider'
import { RolesTable } from '@/features/roles/components/roles-table'
import { roles } from '@/features/roles/data/roles'
import { useTranslation } from 'react-i18next'
import { useGetRole } from './api/rolesapi'

const route = getRouteApi('/_authenticated/roles/')

export function Roles() {
  const search = route.useSearch()
  const navigate = route.useNavigate()
    const { t } = useTranslation() 
const { data:Role } = useGetRole()
console.log('Fetched roles:', Role)

  return (
    <RoleProvider>
      <Header fixed>
        <Search />
        <div className='ms-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>{t('roles.title')} </h2>
            <p className='text-muted-foreground'>
{t('roles.description')}            </p>
          </div>
          <UsersPrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
          {/* <RolesTable data={roles} search={search} navigate={navigate} /> */}
          <RolesTable data={roles ?? []} search={search} navigate={navigate} />
        </div>
      </Main>

      <RoleDialogs />
    </RoleProvider>
  )
}
