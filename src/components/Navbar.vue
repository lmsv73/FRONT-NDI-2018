<template>
    <div>
        <b-navbar toggleable="md" type="dark" variant="info">
            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

            <b-collapse is-nav id="nav_collapse">
                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-item to="/">Dashboard</b-nav-item>
                    <b-nav-item to="/stock">Stock</b-nav-item>
                    <b-nav-item to="/missions">Missions</b-nav-item>
                    <b-nav-item to="/journal">Journal</b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>
