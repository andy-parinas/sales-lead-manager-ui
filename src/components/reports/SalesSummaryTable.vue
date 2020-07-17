<template>
    <v-card outlined>
        <v-simple-table>
            <template v-slot:default>
                <thead>
                <tr>
                    <th class="text-left">Design Adivisor</th>
                    <th class="text-left">Franchise</th>
                    <th class="text-left"># Leads</th>
                    <th class="text-left"># Sales</th>
                    <th class="text-left">Total Contracts</th>
                    <th class="text-left">Conversion Rate </th>
                    <th class="text-left">Average Sales Price</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in desserts" :key="item.name">
                    <td>{{ item.name }}</td>
                    <td>{{ item.franchise }}</td>
                    <td>{{ item.numberOfLeads }}</td>
                    <td>{{ item.numberOfSales }}</td>
                    <td>{{ item.totalContracts }}</td>
                    <td>{{ item.conversionRate }}</td>
                    <td>{{ item.averageSalesPrice }}</td>
                </tr>
                </tbody>
            </template>
        </v-simple-table>
    </v-card>
</template>

<script>
    export default {
        name: "SalesSummaryTable",
        data () {
            return {
                desserts: [
                    {
                        name: 'Joe Blogs',
                        franchise: 1234,
                        numberOfLeads: 10,
                        numberOfSales: 2,
                        totalContracts: 50000,
                        conversionRate: '20%',
                        averageSalesPrice: 25000,
                        calories: 159,
                    },
                    {
                        name: 'Sam Smith',
                        franchise: 4567,
                        numberOfLeads: 20,
                        numberOfSales: 5,
                        totalContracts: 100000,
                        conversionRate: '20%',
                        averageSalesPrice: 20000,
                        calories: 237,
                    },
                    {
                        name: 'Graham Jones',
                        franchise: 8965,
                        numberOfLeads: 30,
                        numberOfSales: 9,
                        totalContracts: 200000,
                        conversionRate: '20%',
                        averageSalesPrice: 22000,
                        calories: 262,
                    },
                ],
            }
        },
    }
</script>

<style scoped>

</style>