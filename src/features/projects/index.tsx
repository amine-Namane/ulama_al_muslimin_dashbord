import { getRouteApi } from '@tanstack/react-router'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { ProjectDialogs } from '@/features/projects/components/project-dialogs'
import { UsersPrimaryButtons } from '@/features/projects/components/users-primary-buttons'
import {  ProjectProvider } from '@/features/projects/components/project-provider'
import { ProjectTable } from '@/features/projects/components/project-table'
import {  projects} from '@/features/projects/data/project'
import { useTranslation } from 'react-i18next'

const route = getRouteApi('/_authenticated/projects/')

export function Projects() {
  const search = route.useSearch()
  const navigate = route.useNavigate()
    const { t } = useTranslation() 

  return (
    < ProjectProvider>
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
            <h2 className='text-2xl font-bold tracking-tight'>{t('projects.title')} </h2>
            <p className='text-muted-foreground'>
              {t('projects.description')}
            </p>
          </div>
          <UsersPrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
          < ProjectTable data={projects} search={search} navigate={navigate} />
        </div>
      </Main>

      <ProjectDialogs />
    </ ProjectProvider>
  )
}
