<template>
        <div class="p-3">
                    <!-- 总数：{{list.length}} 完成：{{donelist.length}} 未完成：{{undonelist.length}} -->
                     <slot :donelist="donelist" :undonelist="undonelist">总数：{{list.length}} 完成：{{donelist.length}} 未完成：{{undonelist.length}}</slot>
                </div>
</template>

<script>
export default{
    name:'TodoFooter',
      props: ['list'],
            computed: {
                donelist() {
                    return this.list.filter(item => item.done)
                },
                undonelist() {
                    return this.list.filter(item => !item.done)
                }
            },
}
</script>
<style>

</style>