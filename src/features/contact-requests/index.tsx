import { getRouteApi } from '@tanstack/react-router'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { ContactDialogs } from '@/features/contact-requests/components/contact-requests-dialogs'
import { UsersPrimaryButtons } from '@/features/contact-requests/components/users-primary-buttons'
import { ContactProvider } from '@/features/contact-requests/components/contact-requests-provider'
import { ContactTable } from '@/features/contact-requests/components/contact-requests-table'
import { contactRequests } from '@/features/contact-requests/data/contact-requests'
import { useTranslation } from 'react-i18next'

const route = getRouteApi('/_authenticated/contact-requests/')

export function Contacts() {
  const search = route.useSearch()
  const navigate = route.useNavigate()
    const { t } = useTranslation() 

  return (
    <ContactProvider>
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
            <h2 className='text-2xl font-bold tracking-tight'>{t('contacts.title')} </h2>
            <p className='text-muted-foreground'>
         {t('contacts.description')}
            </p>
          </div>
          <UsersPrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
          <ContactTable data={contactRequests} search={search} navigate={navigate} />
        </div>
      </Main>

      <ContactDialogs />
    </ContactProvider>
  )
}
