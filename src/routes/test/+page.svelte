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
		Popover
	} from 'konsta/svelte';
    import { Login } from 'sveltegram';

	let darkMode = false;
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
				localStorage.setItem('userdata', userdata);
			});
	};
</script>
<Page>
    <div>ddd</div>
    <List strong inset>
        <ListItem title="Тёмная тема" label>
            <Toggle slot="after" component="div" onChange={() => toggleDarkMode()} checked={darkMode} />
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
</Page>