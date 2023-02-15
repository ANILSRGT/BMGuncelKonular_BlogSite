import express, { json, urlencoded } from 'express';
const app = express();
import { set, connect } from 'mongoose';
import { join } from 'path';
import { create } from 'express-handlebars';
import blogRouter from './routes/blogs';

app.use(json());

const PORT = process.env.PORT || 3000;
const mongoUrl = '{YOUR_MONGO_URL}';

const hbs = create({
    defaultLayout: 'main',
    extname: 'hbs',
    helpers: require('./helpers/hbs_helpers')
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(urlencoded({ extended: true }));
app.use(express.static(join(__dirname, 'public')));
app.use('/', blogRouter);

async function start() {
    try {
        set('strictQuery', true);
        connect(mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    } catch (error) {
        console.log('Error', error);
    }
}

start();