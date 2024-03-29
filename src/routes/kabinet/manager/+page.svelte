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
		NavbarBackLink,
		Popover
	} from 'konsta/svelte';
	import { Login } from 'sveltegram';

	let darkMode = false;
	let userdata;
	let hello = function (/** @type {object} */ msg) {
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
				userdata = JSON.stringify(msg);
				localStorage.setItem('userdata', userdata);
				return response.json();
			})
			.then((data) => {
				console.dir(data.r);
			});
	};
	function test() {
		hello({ test: 'manager' });
	}
	const goBack = () => {
		history.back();
	};
</script>

<Page>
	<Navbar title="" class="top-0 sticky">
		<NavbarBackLink href="/" slot="left" >&nbsp;На главную</NavbarBackLink>
		
		<Link slot="right" navbar>
		
		</Link>
		<Segmented slot="subnavbar" strong activeButtonIndex={0} childButtonsLength={3}>
			<SegmentedButton href="/kabinet/" small strong >Специалист</SegmentedButton>
			<SegmentedButton href="/kabinet/owner/" small strong >Владелец техники</SegmentedButton>
			<SegmentedButton href="/kabinet/manager/" small strong active>Менеджер</SegmentedButton>
		</Segmented>
	</Navbar>

	<List strong inset>
		<ListItem title="" label>
			<Login
			username="RtverBot"
			requestAccess={true}
			on:auth={(data) => {
				console.log(data.detail);
				hello(data.detail);
				//goto('/blog');
			}}
		/>
		</ListItem>
	</List>
</Page>
