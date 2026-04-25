import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { TopNav } from '@/components/layout/top-nav'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { Overview } from './components/overview'
import { RecentSales } from './components/recent-sales'
import HandIcon from '@/assets/custom/icon-hand'
import WorkIcon from '@/assets/custom/icon-work'
import LightIbulbcon from '@/assets/custom/icon-lightbulb'
import { useTranslation } from 'react-i18next'

export function Dashboard() {
  const { t } = useTranslation()

  return (
    <>
      {/* ===== Top Heading ===== */}
      <Header>
        <Search />
        <div className="ms-auto flex items-center space-x-4">
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>

      {/* ===== Main ===== */}
      <Main>
        <div className="mb-2 flex items-center justify-between space-y-2">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {t('dashboard.title')}
            </h1>
            <span className='text-gray-600'>
              {t('dashboard.subtitle', 'قم بادارة الشريط العلوي لموقع الجمعية مع امكانية اضافة عناصر جديد')}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Button className='bg-[#095555]'>{t('dashboard.download')}</Button>
          </div>
        </div>
        
        <Tabs orientation="vertical" defaultValue="overview" className="space-y-4">
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {t('dashboard.cards.totalDonations')}
                  </CardTitle>
                  <HandIcon />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$45,231.89</div>
                  <p className="text-muted-foreground text-xs">
                    {t('dashboard.cards.totalDonationsChange')}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {t('dashboard.cards.projects')}
                  </CardTitle>
                  <WorkIcon />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2350</div>
                  <p className="text-muted-foreground text-xs">
                    3 {t('dashboard.cards.projectsChange')}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {t('dashboard.cards.volunteers')}
                  </CardTitle>
                  <HandIcon />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12,234</div>
                  <p className="text-muted-foreground text-xs">
                    20 {t('dashboard.cards.volunteersChange')}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {t('dashboard.cards.activities')}
                  </CardTitle>
                  <LightIbulbcon />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">573</div>
                  <p className="text-muted-foreground text-xs">
                    7 {t('dashboard.cards.activitiesChange')}
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
              <Card className="col-span-1 lg:col-span-4">
                <CardHeader>
                  <CardTitle>{t('dashboard.charts.monthDonations')}</CardTitle>
                  <CardDescription>
                    {t('dashboard.charts.monthDonationsDesc')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="ps-2">
                  <Overview />
                </CardContent>
              </Card>
              <Card className="col-span-1 lg:col-span-3">
                <CardHeader>
                  <CardTitle>{t('dashboard.charts.recentDonations')}</CardTitle>
                  <CardDescription>
                    {t('dashboard.charts.recentDonationsDesc')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentSales />
                </CardContent>
              </Card>
            </div>

            {/* ===== New Section: Upcoming Events ===== */}
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4">
                {t('dashboard.events.title', 'الأحداث القادمة')}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>{t('dashboard.events.event1.title', 'حدث التبرع السنوي')}</CardTitle>
                    <CardDescription>
                      {t('dashboard.events.event1.date', '15 ديسمبر 2024')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {t('dashboard.events.event1.desc', 'انضم إلينا في حدث التبرع السنوي الكبير')}
                    </p>
                    <Button variant="outline" size="sm" className="mt-3">
                      {t('dashboard.events.register', 'تسجيل')}
                    </Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>{t('dashboard.events.event2.title', 'ورشة عمل التطوع')}</CardTitle>
                    <CardDescription>
                      {t('dashboard.events.event2.date', '20 ديسمبر 2024')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {t('dashboard.events.event2.desc', 'تعلم مهارات التطوع الجديدة')}
                    </p>
                    <Button variant="outline" size="sm" className="mt-3">
                      {t('dashboard.events.register', 'تسجيل')}
                    </Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>{t('dashboard.events.event3.title', 'اجتماع المانحين')}</CardTitle>
                    <CardDescription>
                      {t('dashboard.events.event3.date', '5 يناير 2025')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {t('dashboard.events.event3.desc', 'لقاء المانحين والشركاء')}
                    </p>
                    <Button variant="outline" size="sm" className="mt-3">
                      {t('dashboard.events.register', 'تسجيل')}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* ===== New Section: Statistics Summary ===== */}
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4">
                {t('dashboard.stats.title', 'ملخص إحصائي')}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-[#095555]">150+</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {t('dashboard.stats.activeProjects', 'مشروع نشط')}
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-[#095555]">5000+</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {t('dashboard.stats.totalVolunteers', 'متطوع')}
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-[#095555]">100+</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {t('dashboard.stats.completedProjects', 'مشروع مكتمل')}
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-[#095555]">25</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {t('dashboard.stats.partners', 'شريك')}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* ===== New Section: Recent Activities ===== */}
            <div className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t('dashboard.recentActivities.title', 'الأنشطة الأخيرة')}</CardTitle>
                  <CardDescription>
                    {t('dashboard.recentActivities.desc', 'أحدث الأنشطة والفعاليات التي تمت')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b pb-3">
                      <div>
                        <p className="font-medium">{t('dashboard.recentActivities.activity1', 'حملة تبرعات الشتاء')}</p>
                        <p className="text-sm text-muted-foreground">{t('dashboard.recentActivities.activity1Detail', 'تم جمع 50,000 ريال')}</p>
                      </div>
                      <span className="text-xs text-green-600">{t('dashboard.recentActivities.completed', 'مكتمل')}</span>
                    </div>
                    <div className="flex items-center justify-between border-b pb-3">
                      <div>
                        <p className="font-medium">{t('dashboard.recentActivities.activity2', 'ورشة تطوعية')}</p>
                        <p className="text-sm text-muted-foreground">{t('dashboard.recentActivities.activity2Detail', 'شارك 75 متطوع')}</p>
                      </div>
                      <span className="text-xs text-blue-600">{t('dashboard.recentActivities.inProgress', 'قيد التنفيذ')}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{t('dashboard.recentActivities.activity3', 'افتتاح مشروع جديد')}</p>
                        <p className="text-sm text-muted-foreground">{t('dashboard.recentActivities.activity3Detail', 'مشروع المياه النظيفة')}</p>
                      </div>
                      <span className="text-xs text-purple-600">{t('dashboard.recentActivities.upcoming', 'قادم')}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </Main>
    </>
  )
}