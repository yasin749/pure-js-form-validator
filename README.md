# Pure Js Form Validator

Form validates and displays errors
[Demo page](https://yasin749.github.io/pure-js-form-validator/demo)
```
npm i pure-js-form-validator
```

## How to use
You must include the script on the page
```html
<script type="text/javascript" src="../js/pure-js-form-validator.js" lang="javascript"></script
```
You can do this with any web packaging tool. For example Grunt, Gulp.

#### Null control
The relevant element is given a null control by giving ```rq="true"``` attribute.
```html
<form>
    <label>Name</label>
    <input type="text" rq="true">
    <button type="submit">Send</button>
</form>
<script>
    pureJsFormValidator(document.querySelector('form'))
</script>
```

#### Mask Control
The corresponding element is masked by giving ```rqType="mail"``` attribute. Other masking options are below.
* E-Mail = ```mail```
* Phone = ```tel```
* Date = ```date```
* Number = ```number```
* Url = ```url```
* Not Url = ```noUrl```
* Name = ```name```
* User name = ```userName``` 
```html
<form>
    <label>E-Mail</label>
    <input type="text" rq="true" rqType="mail">
    <button type="submit">Send</button>
</form>
<script>
    pureJsFormValidator(document.querySelector('form'));
</script>
```
You can also use it in different masks.

#### Warning Messages
You can change warning messages to be displayed on the screen
```html
<form>
    <label>E-Mail</label>
    <input type="text" rq="true" rqType="mail">
    <button type="submit">Send</button>
</form>
<script>
    pureJsFormValidator(document.querySelector('form'),{
        requiredText: 'Empty can not pass',
        invalidText: 'Invalid format'
    });
</script>
```

#### Custom warning message
You can give input a special warning message.
* Required text = ```requiredText=""```
* Invalid required text = ```requiredTextInvalid=""```
```html
<form>
    <label>E-Mail</label>
    <input type="text" rq="true" rqType="mail" requiredText="This field can not be empty" requiredTextInvalid="You entered an invalid value">
    <button type="submit">Send</button>
</form>
<script>
    pureJsFormValidator(document.querySelector('form'));
</script>
```


#### Warning Class
You can change the classes of the corresponding HTML elements in case of incorrect input
```html
<form>
    <label>E-Mail</label>
    <input type="text" rq="true" rqType="mail">
    <button type="submit">Send</button>
</form>
<script>
    pureJsFormValidator(document.querySelector('form'),{
        rqInputClass : 'required',
        rqTextClass : 'warning-message',
    });
</script>
```

#### New Mask
You can define new masks.
```html
<form>
    <label>Cart No</label>
    <input type="text" rq="true" rqType="creditcart">
    <button type="submit">Send</button>
</form>
<script>
    pureJsFormValidator(document.querySelector('form'),{},{
        creditcart : new RegExp('^3[47][0-9]{13}$')
    });
</script>
```

### Use with other inputs

#### Selectbox
```html
<select rq="true">
    <option value="">Please Choose</option>
    <option value="Turkish">Turkish</option>
    <option value="English">English</option>
</select>
```

#### Checkbox
```html
<checkbox rq="true">
    <input type="checkbox" name="lang[]" value="Turkish" >
    <input type="checkbox" name="lang[]" value="English" >
</checkbox>
```

#### Radio
```html
<radio rq="true">
    <input type="radio" name="Turkish" value="Turkish" >
    <input type="radio" name="English" value="English" >
</radio>
```

#### Textarea
```html
<textarea rq="true"></textarea>
```




## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details