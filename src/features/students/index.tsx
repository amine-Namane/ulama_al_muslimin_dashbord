import { getRouteApi } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { StudentsDialogs } from './components/students-dialogs'
import { StudentsPrimaryButtons } from './components/students-primary-buttons'
import { StudentsProvider } from './components/students-provider'
import { StudentsTable } from './components/students-table'
import { students } from './data/students'

const route = getRouteApi('/_authenticated/students/')

export function Students() {
  const { t, i18n } = useTranslation()
  const search = route.useSearch()
  const navigate = route.useNavigate()

  return (
    <StudentsProvider>
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
            <h2 className='text-2xl font-bold tracking-tight'>
              {t('students.title')}
            </h2>
            <p className='text-muted-foreground'>{t('students.description')}</p>
          </div>
          <StudentsPrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
          <StudentsTable data={students} search={search} navigate={navigate} />
        </div>
      </Main>

      <StudentsDialogs />
    </StudentsProvider>
  )
}
