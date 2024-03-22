<script>
  import {
    Page,
    Navbar,
    Toolbar,
    Block,
    Button,
    BlockTitle,
    List,
    ListItem,
    Radio,
    Toggle,
    Tabbar,
    TabbarLink,
    Icon,
    Link,
    Popover
  } from 'konsta/svelte';
  import {
    EnvelopeFill,
    Calendar,
    CloudUploadFill,
  } from 'framework7-icons/svelte';
  import { Login } from 'sveltegram';
  import MdEmail from '../components/MdEmail.svelte';
  import MdToday from '../components/MdToday.svelte';
  import CowIcon from '../components/CowIcon.svelte';

  import MdFileUpload from '../components/MdFileUpload.svelte';

  let activeTab = 'tab-1';
  let isTabbarLabels = true;
  let isTabbarIcons = true;

  import { afterUpdate } from 'svelte';
  import GoatIcon from '../components/GoatIcon.svelte';


  
  export let setTheme;
  export let setColorTheme;
  export let colorPickerOpened;

  let darkMode = false;

  const toggleDarkMode = () => {
    darkMode = !darkMode;
    if(darkMode){
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  let rtl = false;
  const toggleRtl = () => {
    rtl = !rtl;
    if(rtl){
      document.dir = 'rtl';
    }else{
      document.dir = 'ltr';
    }
  };

  afterUpdate(() => {
    darkMode = document.documentElement.classList.contains('dark');
    rtl = document.dir === 'rtl';
  });
  setTheme('material')
  setColorTheme('k-color-brand-green')
  document.documentElement.classList.remove('dark')

  let userdata
  let hello = function (/** @type {any} */ msg) {
    //let msg = {
    //	id: 5454543,
    //	first_name: 'Александр',
    //	last_name: 'Иванов',
    //	username: 'ivanov',
    //	photo_url: 'https://t.me/i/userpic/3HRmcAQC08hWbMziD-L8.jpg',
    //	auth_date: 1710750836,
    //	hash: 'dfdfc4ed1a3102a6d08e0dc5fa18de0822464ac'
    //};

    fetch("https://api.rtver.ru/hello/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(msg),
    })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.dir(data.r)
        userdata = data.r
        localStorage.setItem("userdata", JSON.stringify(userdata))
      })
  }

</script>

<Page>

  <Tabbar
    labels={isTabbarLabels}
    icons={isTabbarIcons}
    class="left-0 bottom-0 fixed"
  >
    {#if isTabbarIcons}
      <TabbarLink
        active={activeTab === 'tab-1'}
        onClick={() => (activeTab = 'tab-1')}
        label={isTabbarLabels ? '' : undefined}
      >
        <svelte:fragment slot="icon">
          <Icon>
            
            <GoatIcon slot="material" class="w-7 h-7" />
          </Icon>
        </svelte:fragment>
      </TabbarLink>
      <TabbarLink
        active={activeTab === 'tab-2'}
        onClick={() => (activeTab = 'tab-2')}
        label={isTabbarLabels ? '' : undefined}
      >
        <svelte:fragment slot="icon">
          <Icon>
       
            <CowIcon slot="material" class="w-7 h-7" />
          </Icon>
        </svelte:fragment>
      </TabbarLink>
      <TabbarLink
        active={activeTab === 'tab-3'}
        onClick={() => (activeTab = 'tab-3')}
        label={isTabbarLabels ? 'Настройки' : undefined}
      >
        <svelte:fragment slot="icon">
          <Icon>
      
            <MdToday slot="material" class="w-7 h-7" />
          </Icon>
        </svelte:fragment>
      </TabbarLink>
    {:else}
      <TabbarLink
        active={activeTab === 'tab-1'}
        onClick={() => (activeTab = 'tab-1')}
        label={isTabbarLabels ? '' : undefined}
      />
      <TabbarLink
        active={activeTab === 'tab-2'}
        onClick={() => (activeTab = 'tab-2')}
        label={isTabbarLabels ? '' : undefined}
      />
      <TabbarLink
        active={activeTab === 'tab-3'}
        onClick={() => (activeTab = 'tab-3')}
        label={isTabbarLabels ? 'Настройки' : undefined}
      />
    {/if}
  </Tabbar>


  {#if activeTab === 'tab-1'}
    <Block strong inset class="space-y-4">
      <p>
        <b>Тут коза</b>
      </p>
     <GoatIcon class="w-8"/>
    </Block>
  {/if}
  {#if activeTab === 'tab-2'}
    <Block strong inset class="space-y-4">
      <p>
        <b>Тут корова</b>
      </p>
     <CowIcon></CowIcon>
 
    </Block>
  {/if}
  {#if activeTab === 'tab-3'}

  <Login
  username="RtverBot"
  requestAccess={true}
  on:auth={(data) => {
    console.log(data.detail)
    hello(data.detail)
    //goto('/blog');
  }}
/>

  <List strong inset>
    <ListItem title="Тёмная тема" label>
      <Toggle
        slot="after"
        component="div"
        onChange={() => toggleDarkMode()}
        checked={darkMode}
      />
    </ListItem>

    <ListItem
      title="Цветовая схема"
      link
      onClick={() => (colorPickerOpened = true)}
    >
      <div
        slot="after"
        class="w-6 h-6 rounded-full bg-primary home-color-picker"
      />
    </ListItem>
  </List>
  <Popover
    opened={colorPickerOpened}
    onBackdropClick={() => (colorPickerOpened = false)}
    size="w-36"
    target=".home-color-picker"
  >
    <div class="grid grid-cols-3 py-2">
      <Link
        touchRipple
        class="overflow-hidden h-12"
        onClick={() => setColorTheme('')}
      >
        <span class="bg-brand-primary w-6 h-6 rounded-full" />
      </Link>
      <Link
        touchRipple
        class="overflow-hidden h-12"
        onClick={() => setColorTheme('k-color-brand-red')}
      >
        <span class="bg-brand-red w-6 h-6 rounded-full" />
      </Link>
      <Link
        touchRipple
        class="overflow-hidden h-12"
        onClick={() => setColorTheme('k-color-brand-green')}
      >
        <span class="bg-brand-green w-6 h-6 rounded-full" />
      </Link>
      <Link
        touchRipple
        class="overflow-hidden h-12"
        onClick={() => setColorTheme('k-color-brand-yellow')}
      >
        <span class="bg-brand-yellow w-6 h-6 rounded-full" />
      </Link>
      <Link
        touchRipple
        class="overflow-hidden h-12"
        onClick={() => setColorTheme('k-color-brand-purple')}
      >
        <span class="bg-brand-purple w-6 h-6 rounded-full" />
      </Link>
    </div>
  </Popover>
  {/if}

</Page>
