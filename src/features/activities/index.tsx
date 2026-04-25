import { getRouteApi } from '@tanstack/react-router'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
// import { UsersDialogs } from '@/features/users/components/users-dialogs'
import { ActivitiesDialogs } from '@/features/activities/components/activities-dialogs'
import { UsersPrimaryButtons } from '@/features/activities/components/users-primary-buttons'
// import { UsersProvider } from '@/features/users/components/users-provider'
import { ActivitiesProvider } from '@/features/activities/components/activties-provider'
import { ActivitiesTable } from '@/features/activities/components/activities-table'
import { activities } from '@/features/activities/data/activities'
import { useTranslation } from 'react-i18next'

const route = getRouteApi('/_authenticated/activities/')

export function Activities() {
  const search = route.useSearch()
  const navigate = route.useNavigate()
    const { t } = useTranslation() 

  return (
    <ActivitiesProvider>
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
            <h2 className='text-2xl font-bold tracking-tight'>{t('activities.title')} </h2>
            <p className='text-muted-foreground'>
{t('activities.description')}            </p>
          </div>
          <UsersPrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
          <ActivitiesTable data={activities} search={search} navigate={navigate} />
        </div>
      </Main>

      <ActivitiesDialogs />
    </ActivitiesProvider>
  )
}
