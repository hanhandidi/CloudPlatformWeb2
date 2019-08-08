<template>
	<div>
		<AdminHeader />
		<Menu />
	</div>
	
</template>

<script>
	import adminHeader from './adminHeader'
    import body from './adminBody'
    export default {
        name: "adminMain",
        components:{
            AdminHeader:adminHeader,
            Menu:body
        }
    }
</script>

<style>
</style>
