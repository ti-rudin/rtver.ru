<script>
	export let data;

	let r = JSON.stringify(data);
	import {
		Page,
		Navbar,
		Card,
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
		Popover,
		Chip
	} from 'konsta/svelte';
	import { Login } from 'sveltegram';
	import MdPerson from '$lib/MdPerson.svelte';

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
				console.dir(data);
			});
	};
	function test() {
		hello({ test: 'master' });
	}
	const goBack = () => {
		history.back();
	};
	let userIsAuth = false;

	import { afterUpdate, onMount } from 'svelte';
	onMount(() => {
		userdata = localStorage.getItem('userdata');
	});
	$: userIsAuth = userdata;
</script>

<Page>
	<Navbar title="" class="top-0 sticky">
		<NavbarBackLink href="/" slot="left">&nbsp;На главную</NavbarBackLink>
	</Navbar>

	<div class="flex h-screen justify-center">
		<div class="text-center">
			<Card>
				Для авторизации пользователей, мы используем сервис идентификаци Телеграмм. <br />После
				ввода телефона, зайдите в приложение, Вам по служебному каналу придет запрос на доступ к следующей
				информации:
			</Card>

			<List class="flex justify-center items-center">
				<ListItem title="Имя и никнейм" class="text-cente" />
				<ListItem title="Фото" class="text-cente" />
			</List>
			<Block strong inset class="space-y-4">
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
		</div>
	</div>
</Page>
