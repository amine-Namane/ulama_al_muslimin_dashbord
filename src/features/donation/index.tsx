import { getRouteApi } from '@tanstack/react-router'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { DonationDialogs } from '@/features/donation/components/donation-dialogs'
import { UsersPrimaryButtons } from '@/features/donation/components/users-primary-buttons'
import { DonationProvider } from '@/features/donation/components/donation-provider'
import { DonationTable } from '@/features/donation/components/donation-table'
import { donations } from '@/features/donation/data/donation'
import { useTranslation } from 'react-i18next'

const route = getRouteApi('/_authenticated/donation/')

export function Donations() {
  const search = route.useSearch()
  const navigate = route.useNavigate()
    const { t } = useTranslation() 

  return (
    <DonationProvider>
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
            <h2 className='text-2xl font-bold tracking-tight'> {t('donations.title')} </h2>
            <p className='text-muted-foreground'>
         {t('donations.description')} 
            </p>
          </div>
          <UsersPrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
          <DonationTable data={donations} search={search} navigate={navigate} />
        </div>
      </Main>

      <DonationDialogs />
    </DonationProvider>
  )
}
