import { getRouteApi } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { TeachersDialogs } from './components/teachers-dialogs'
import { TeachersPrimaryButtons } from './components/teachers-primary-buttons'
import { TeachersProvider } from './components/teachers-provider'
import { TeachersTable } from './components/teachers-table'
import { teachers } from './data/teachers'

const route = getRouteApi('/_authenticated/teachers/')
console.log('=== INDEX.TSX DEBUG ===')
  console.log('Imported teachers:', teachers)
  console.log('Imported teachers length:', teachers?.length)
  console.log('Type of teachers:', Array.isArray(teachers))
export function Teachers() {
  const { t } = useTranslation()

  return (
    <TeachersProvider>
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
              {t('teachers.title')}
            </h2>
            <p className='text-muted-foreground'>
              {t('teachers.description')}
            </p>
          </div>
          <TeachersPrimaryButtons />
        </div>

        <div className='-mx-4 flex-1 overflow-auto px-4 py-1'>
          {/* ✅ FIX: removed wrong props */}
          <TeachersTable data={teachers} />
        </div>
      </Main>

      <TeachersDialogs />
    </TeachersProvider>
  )
}