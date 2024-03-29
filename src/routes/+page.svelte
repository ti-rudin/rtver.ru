<script>
	export let data;

	let r = JSON.stringify(data);
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
		Segmented,
		SegmentedButton,
		Popover,
		Chip
	} from 'konsta/svelte';

	import { Login } from 'sveltegram';

	import MdPerson from '$lib/MdPerson.svelte';
	import LudiIcon from '../components/LudiIcon.svelte';
	import TraktorIcon from '../components/TraktorIcon.svelte';
	import KontraktIcon from '../components/KontraktIcon.svelte';

	let activeTab = 'tab-1';
	let isTabbarLabels = true;
	let isTabbarIcons = true;

	import { afterUpdate, onMount } from 'svelte';

	export let colorPickerOpened;

	let darkMode = false;

	const toggleDarkMode = () => {
		darkMode = !darkMode;
		if (darkMode) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	};

	let rtl = false;

	afterUpdate(() => {
		darkMode = document.documentElement.classList.contains('dark');
		rtl = document.dir === 'rtl';
	});
	onMount(() => {
		let userdata = localStorage.getItem('userdata');
		if (userdata) {
		rightOpen = true;
		console.log('tru');
	}
		if (userdata !== null) {
			console.log(userdata);
		} else {
			console.log('userdata undef');
		
		}
	});

	let userdata;
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

		fetch('https://api.rtver.ru/hello/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify(msg)
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				console.dir(data.r);
				userdata = data.r;
				localStorage.setItem('userdata', JSON.stringify(userdata));
				
			});
	};
	let rightOpen = false;

</script>

<Page>
	<Navbar title="РТверь" class="top-0 sticky">
		{#if !rightOpen}
			<Link href="/kabinet" navbar iconOnly slot="right">
				Кабинет сотрудника
				<Icon badgeColors={{ bg: 'bg-red-500' }}>
					<MdPerson slot="material" class="w-6 h-6" />
				</Icon>
			</Link>
		{:else}
		{userdata.id}
		<Link href="/kabinet" navbar iconOnly slot="right">
			<Chip class="m-0.5">
			
				<img
					slot="media"
					alt="avatar"
					class="h-8 rounded-full"
					src="https://cdn.framework7.io/placeholder/people-100x100-3.jpg"
				/>
				John Doe
		
			</Chip>
		</Link>
		
		{/if}
	</Navbar>

	<Tabbar labels={isTabbarLabels} icons={isTabbarIcons} class="left-0 bottom-0 fixed">
		{#if isTabbarIcons}
			<TabbarLink
				active={activeTab === 'tab-1'}
				onClick={() => (activeTab = 'tab-1')}
				label={isTabbarLabels ? '' : undefined}
			>
				<svelte:fragment slot="icon">
					<Icon>
						<TraktorIcon slot="material" class="w-7 h-7" />
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
						<LudiIcon slot="material" class="w-7 h-7" />
					</Icon>
				</svelte:fragment>
			</TabbarLink>
			<TabbarLink
				active={activeTab === 'tab-3'}
				onClick={() => (activeTab = 'tab-3')}
				label={isTabbarLabels ? '' : undefined}
			>
				<svelte:fragment slot="icon">
					<Icon>
						<KontraktIcon slot="material" class="w-7 h-7" />
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
				label={isTabbarLabels ? '' : undefined}
			/>
		{/if}
	</Tabbar>

	{#if activeTab === 'tab-1'}
		<Block strong inset class="space-y-4">
			<p>
				.
				<b>Тут техника</b>
			</p>
			<TraktorIcon class="w-8" />
		</Block>
	{/if}
	{#if activeTab === 'tab-2'}
		<Block strong inset class="space-y-4">
			<p>
				<b>Тут пипл{r}</b>
			</p>
			<LudiIcon />
		</Block>
	{/if}
	{#if activeTab === 'tab-3'}
		<Block strong inset class="space-y-4">
			<p>
				<b>Тут контракты</b>
			</p>
			<KontraktIcon />

			<List strong inset>
				<ListItem title="Тёмная тема" label>
					<Toggle
						slot="after"
						component="div"
						onChange={() => toggleDarkMode()}
						checked={darkMode}
					/>
				</ListItem>
			</List>
			<Login
				username="RtverBot"
				requestAccess={true}
				on:auth={(data) => {
					console.log(data.detail);
					hello(data.detail);
					//goto('/blog');
				}}
			/>
		</Block>
	{/if}
</Page>
