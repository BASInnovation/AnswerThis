var express = require('express');
var router = express.Router();
var fs = require('fs');

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

module.exports = function(passport){

	/* GET login page. */
	router.get('/', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('index', { message: req.flash('message') });
	});

	/* Handle Login POST */
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/home',
		failureRedirect: '/',
		failureFlash : true  
	}));

	/* GET Registration Page */
	router.get('/signup', isAuthenticated, function(req, res){
		res.render('register',{message: req.flash('message'), user: req.user});
	});

	/* Handle Registration POST */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/home',
		failureRedirect: '/signup',
		failureFlash : true  
	}));

	router.get('/manageusers', isAuthenticated, function(req, res){
		res.render('manageusers',{ user: req.user });
	});

	/* Get organisation list */
	router.get('/manageusers/userlist', function(req, res) {
		var db = req.userdb;
		db.collection('users').find().toArray(function (err, items) {
			if (err) console.log(err)
			res.json(items);
		});
	});

	/* GET Home Page */
	router.get('/home', isAuthenticated, function(req, res){
		res.render('home', { user: req.user });
	});

	router.get('/about', isAuthenticated, function(req, res){
		res.render('about', { user: req.user });
	});

	router.get('/add_project', isAuthenticated, function(req, res){
		res.render('add_project', { user: req.user });
	});

	/* POST to addorganisation*/
	router.post('/add_project/addproduct', isAuthenticated, function(req, res) {
		var db = req.presalesdb;

		db.collection('products').insert(req.body, function(err, result){
			if (err) 
			{
					throw err
			}
			else
			{
			
				saveMainImage(db,result[0]._id,result[0]._id,req,res);
			}
		});
	});

	router.post('/products/updateproduct/:id', function(req, res) {
		console.log(req.files)
		var db = req.presalesdb;
		var productToUpdate = req.params.id;

		ObjectID = require('mongoskin').ObjectID;
		var id = new ObjectID(productToUpdate);

		//Save and update Images
		saveMainImage(db,productToUpdate,id,req,res);

	});

	router.delete('/products/deleteproduct/:id', function(req, res) {
		var db = req.presalesdb;
		var productToDelete = req.params.id;
		db.collection('products').removeById(productToDelete, function(err, result) {
			if (err) console.log(err)
			
			if(result === 1)
			{
				var fs = require('fs');

				fs.readdir("public/images/uploads", function(err, files) {
					if (err) return;
					files.forEach(function(f) {
						if(f.indexOf(productToDelete) > -1)
						{
							fs.unlink('public/images/uploads/' + f, function (err) {
								if (err) throw err;
								console.log('successfully deleted ' + f);
							});
						}
					});
				})

			    res.send({ msg: '' });
			}
			else
			{
				res.send({ msg:'error ' + err });
			}
		});
	});

	router.get('/manageproducts', isAuthenticated, function(req, res){
		res.render('manageproducts',{ user: req.user });
	});

	router.get('/contact', isAuthenticated, function(req, res){
		res.render('contact', { user: req.user });
	});

	router.get('/innovation', isAuthenticated, function(req, res){
		res.render('innovation', { user: req.user });
	});

	router.get('/managepeople', isAuthenticated, function(req, res){
		res.render('managepeople',{ user: req.user });
	});

	router.get('/people', isAuthenticated, function(req, res){
		res.render('people', { user: req.user });
	});

	router.get('/people/personlist', isAuthenticated, function(req, res){
		var db = req.presalesdb;
		db.collection('people').find().toArray(function (err, items) {
			if (err) console.log(err)
			res.json(items);
		});
	});

	router.get('/people/personlist/:department', isAuthenticated, function(req, res){
		var db = req.presalesdb;
		db.collection('people').find({department:req.params.department}).toArray(function (err, items) {
			if (err) console.log(err)
			res.json(items);
		});
	});

	router.get('/people/:id', isAuthenticated, function(req, res){
		res.render('person', { user: req.user, id: req.params.id });
	});

	router.get('/people/edit/:id', isAuthenticated, function(req, res){
		res.render('editperson', { user: req.user, id: req.params.id });
	});

	router.get('/people/getperson/:id', isAuthenticated, function(req, res){
		var db = req.presalesdb;
		var productToGet = req.params.id;

		ObjectID = require('mongoskin').ObjectID;
		var id = new ObjectID(productToGet);

		db.collection('people').find({_id: id}).toArray(function (err, items) {
			if (err) console.log(err)
			res.json(items);
		});
	});

	router.get('/addpeople', isAuthenticated, function(req, res){
		res.render('addpeople', { user: req.user });
	});

	/* POST to addorganisation*/
	router.post('/addpeople/addperson', isAuthenticated, function(req, res) {
		var db = req.presalesdb;

		db.collection('people').insert(req.body, function(err, result){
			if (err) 
			{
					throw err
					//res.render('add_project', { user: req.user, msg: err });
			}
			else
			{
			
				extension = req.files.displayImage.name.split('.').pop();

				fs.writeFile('public/images/uploads/' + result[0]._id + '.' + extension, req.files.displayImage.data, 'binary', function(err){
            		if (err) 
            		{
            			throw err
            		}
            		else
            		{
            			
            			req.body['imageurl'] = '/images/uploads/' + result[0]._id + '.' + extension

            			db.collection('people').update({_id: result[0]._id}, req.body, function(err, result){
							if (err)
							{
								throw err
							}
							else
							{
								res.redirect('/people');
							}
						});
            		}
            		
        		});
			}
		});
	});

	router.post('/people/updateperson/:id', function(req, res) {
		var db = req.presalesdb;
		var personToUpdate = req.params.id;

		ObjectID = require('mongoskin').ObjectID;
		var id = new ObjectID(personToUpdate);

		if(req.files.displayImage.data.length > 0)
		{
			extension = req.files.displayImage.name.split('.').pop();

			fs.writeFile('public/images/uploads/' + personToUpdate + '.' + extension, req.files.displayImage.data, 'binary', function(err){
        		if (err) 
        		{
        			throw err
        		}
        		else
        		{
        			req.body['imageurl'] = '/images/uploads/' + personToUpdate + '.' + extension
        		
        			db.collection('people').update({_id: id}, req.body, function(err, result){
						if (err) 
						{
							console.log(err)
						}
						else
						{
							res.redirect('/managepeople');
						}
					});
        		}
        		
    		});
		}
		else
		{
			db.collection('people').update({_id: id}, req.body, function(err, result){
				if (err) 
				{
					console.log(err)
				}
				else
				{
					res.redirect('/managepeople');
				}
			});
		}


	});

	router.delete('/people/deleteperson/:id', function(req, res) {
		var db = req.presalesdb;
		var personToDelete = req.params.id;
		db.collection('people').removeById(personToDelete, function(err, result) {
			if (err) console.log(err)
			
			if(result === 1)
			{
				var fs = require('fs');

				fs.readdir("public/images/uploads", function(err, files) {
					if (err) return;
					files.forEach(function(f) {
						if(f.indexOf(personToDelete) > -1)
						{
							fs.unlink('public/images/uploads/' + f, function (err) {
								if (err) throw err;
								console.log('successfully deleted ' + f);
							});
						}
					});
				})

			    res.send({ msg: '' });
			}
			else
			{
				res.send({ msg:'error ' + err });
			}
		});
	});

	router.get('/managepeople', isAuthenticated, function(req, res){
		res.render('managepeople',{ user: req.user });
	});

	router.get('/departments', isAuthenticated, function(req, res){
		res.render('departments', { user: req.user });
	});

	router.get('/departments/departmentlist', isAuthenticated, function(req, res){
		var db = req.presalesdb;
		db.collection('departments').find().toArray(function (err, items) {
			if (err) console.log(err)
			res.json(items);
		});
	});

	router.get('/department/:id', isAuthenticated, function(req, res){
		res.render('department', { user: req.user, id: req.params.id });
	});

	router.get('/departments/edit/:id', isAuthenticated, function(req, res){
		res.render('editdepartment', { user: req.user, id: req.params.id });
	});

	router.get('/departments/getdepartment/:id', isAuthenticated, function(req, res){
		var db = req.presalesdb;
		var departmentToGet = req.params.id;

		ObjectID = require('mongoskin').ObjectID;
		var id = new ObjectID(departmentToGet);

		db.collection('departments').find({_id: id}).toArray(function (err, items) {
			if (err) console.log(err)
			res.json(items);
		});
	});

	router.get('/adddepartments', isAuthenticated, function(req, res){
		res.render('adddepartments', { user: req.user });
	});

	/* POST to addorganisation*/
	router.post('/adddepartments/adddepartment', isAuthenticated, function(req, res) {
		var db = req.presalesdb;

		db.collection('departments').insert(req.body, function(err, result){
			if (err) 
			{
				throw err
				//res.render('add_project', { user: req.user, msg: err });
			}
			else
			{
				res.redirect('/departments');

			}
		});
	});

	router.post('/departments/updatedepartment/:id', function(req, res) {
		var db = req.presalesdb;
		var departmentToUpdate = req.params.id;

		ObjectID = require('mongoskin').ObjectID;
		var id = new ObjectID(departmentToUpdate);

		db.collection('departments').update({_id: id}, req.body, function(err, result){
			if (err) 
			{
				console.log(err)
			}
			else
			{
				res.redirect('/managedepartments');
			}
		});


	});

	router.delete('/departments/deletedepartment/:id', function(req, res) {
		var db = req.presalesdb;
		var personToDelete = req.params.id;
		db.collection('departments').removeById(personToDelete, function(err, result) {
			if (err) console.log(err)
			
			if(result === 1)
			{
			    res.send({ msg: '' });
			}
			else
			{
				res.send({ msg:'error ' + err });
			}
		});
	});

	router.get('/managedepartments', isAuthenticated, function(req, res){
		res.render('managedepartments',{ user: req.user });
	});

	router.delete('/users/deleteuser/:id', function(req, res) {
		var db = req.userdb;
		var userToDelete = req.params.id;
		db.collection('users').removeById(userToDelete, function(err, result) {
			if (err) console.log(err)
			
			if(result === 1)
			{
			    res.send({ msg: '' });
			}
			else
			{
				res.send({ msg:'error ' + err });
			}
		});
	});

	router.get('/products', isAuthenticated, function(req, res){
		res.render('products', { user: req.user });
	});

	router.get('/products/productlist', isAuthenticated, function(req, res){
		var db = req.presalesdb;
		db.collection('products').find().sort({featuredProduct:-1,dateCreated: -1}).toArray(function (err, items) {
			if (err) console.log(err)
			res.json(items);
		});
	});

	router.get('/products/:id', isAuthenticated, function(req, res){
		res.render('product', { user: req.user, id: req.params.id });
	});

	router.get('/products/edit/:id', isAuthenticated, function(req, res){
		res.render('edit_product', { user: req.user, id: req.params.id });
	});

	router.get('/products/getproduct/:id', isAuthenticated, function(req, res){
		var db = req.presalesdb;
		var productToGet = req.params.id;

		ObjectID = require('mongoskin').ObjectID;
		var id = new ObjectID(productToGet);

		db.collection('products').find({_id: id}).toArray(function (err, items) {
			if (err) console.log(err)
			res.json(items);
		});
	});

	router.get('/projectareas', isAuthenticated, function(req, res){
		res.render('projectareas', { user: req.user });
	});

	router.get('/projectareas/projectarealist', isAuthenticated, function(req, res){
		var db = req.presalesdb;
		db.collection('projectareas').find().toArray(function (err, items) {
			if (err) console.log(err)
			res.json(items);
		});
	});

	router.get('/projectarea/:id', isAuthenticated, function(req, res){
		res.render('projectarea', { user: req.user, id: req.params.id });
	});

	router.get('/projectareas/edit/:id', isAuthenticated, function(req, res){
		res.render('editprojectarea', { user: req.user, id: req.params.id });
	});

	router.get('/projectareas/getprojectarea/:id', isAuthenticated, function(req, res){
		var db = req.presalesdb;
		var projectareaToGet = req.params.id;

		ObjectID = require('mongoskin').ObjectID;
		var id = new ObjectID(projectareaToGet);

		db.collection('projectareas').find({_id: id}).toArray(function (err, items) {
			if (err) console.log(err)
			res.json(items);
		});
	});

	router.get('/addprojectareas', isAuthenticated, function(req, res){
		res.render('addprojectareas', { user: req.user });
	});

	/* POST to addorganisation*/
	router.post('/addprojectareas/addprojectarea', isAuthenticated, function(req, res) {
		var db = req.presalesdb;

		db.collection('projectareas').insert(req.body, function(err, result){
			if (err) 
			{
				throw err
				//res.render('add_project', { user: req.user, msg: err });
			}
			else
			{
				res.redirect('/manageprojectareas');

			}
		});
	});

	router.post('/projectareas/updateprojectarea/:id', function(req, res) {
		var db = req.presalesdb;
		var projectareaToUpdate = req.params.id;

		ObjectID = require('mongoskin').ObjectID;
		var id = new ObjectID(projectareaToUpdate);

		db.collection('projectareas').update({_id: id}, req.body, function(err, result){
			if (err) 
			{
				console.log(err)
			}
			else
			{
				res.redirect('/manageprojectareas');
			}
		});
	});

	router.delete('/projectareas/deleteprojectarea/:id', function(req, res) {
		var db = req.presalesdb;
		var personToDelete = req.params.id;
		db.collection('projectareas').removeById(personToDelete, function(err, result) {
			if (err) console.log(err)
			
			if(result === 1)
			{
			    res.send({ msg: '' });
			}
			else
			{
				res.send({ msg:'error ' + err });
			}
		});
	});

	router.get('/manageprojectareas', isAuthenticated, function(req, res){
		res.render('manageprojectareas',{ user: req.user });
	});

	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	return router;
}

function saveMainImage(db,productToUpdate,id,req,res)
{
	if(req.files.mainImage.data.length > 0)
	{
		extension = req.files.mainImage.name.split('.').pop();

		fs.writeFile('public/images/uploads/' + productToUpdate + '.' + extension, req.files.mainImage.data, 'binary', function(err){
    		if (err) 
    		{
    			throw err
    		}
    		else
    		{
    			req.body['mainImageUrl'] = '/images/uploads/' + productToUpdate + '.' + extension
    		
    			db.collection('products').update({_id: id}, req.body, function(err, result){
					if (err) 
					{
						console.log(err)
					}
					else
					{
						saveSubImage1(db,productToUpdate,id,req,res)
					}
				});
    		}
    		
		});
	}
	else
	{
		db.collection('products').update({_id: id}, req.body, function(err, result){
			if (err) 
			{
				console.log(err)
			}
			else
			{
				saveSubImage1(db,productToUpdate,id,req,res)
			}
		});
	}
}

function saveSubImage1(db,productToUpdate,id,req,res)
{
	if(req.files.subImage1.data.length > 0)
	{
		var extension1 = req.files.subImage1.name.split('.').pop();

		fs.writeFile('public/images/uploads/' + productToUpdate + 'sub1.' + extension1, req.files.subImage1.data, 'binary', function(err){
    		if (err) 
    		{
    			throw err
    		}
    		else
    		{
    			req.body['subImage1Url'] = '/images/uploads/' + productToUpdate + 'sub1.' + extension1
    		
    			db.collection('products').update({_id: id}, req.body, function(err, result){
					if (err) 
					{
						console.log(err)
					}
					else
					{
						saveSubImage2(db,productToUpdate,id,req,res)
					}
				});
    		}
    		
		});
	}
	else
	{
		db.collection('products').update({_id: id}, req.body, function(err, result){
			if (err) 
			{
				console.log(err)
			}
			else
			{
				saveSubImage2(db,productToUpdate,id,req,res)
			}
		});
	}
}

function saveSubImage2(db,productToUpdate,id,req,res)
{
	if(req.files.subImage2.data.length > 0)
	{
		var extension2 = req.files.subImage2.name.split('.').pop();

		fs.writeFile('public/images/uploads/' + productToUpdate + 'sub2.' + extension2, req.files.subImage2.data, 'binary', function(err){
    		if (err) 
    		{
    			throw err
    		}
    		else
    		{
    			req.body['subImage2Url'] = '/images/uploads/' + productToUpdate + 'sub2.' + extension2
    		
    			db.collection('products').update({_id: id}, req.body, function(err, result){
					if (err) 
					{
						console.log(err)
					}
					else
					{
						saveSubImage3(db,productToUpdate,id,req,res)
					}
				});
    		}
    		
		});
	}
	else
	{
		db.collection('products').update({_id: id}, req.body, function(err, result){
			if (err) 
			{
				console.log(err)
			}
			else
			{
				saveSubImage3(db,productToUpdate,id,req,res)
			}

		});
	}
}

function saveSubImage3(db,productToUpdate,id,req,res)
{
	if(req.files.subImage3.data.length > 0)
	{
		var extension3 = req.files.subImage3.name.split('.').pop();

		fs.writeFile('public/images/uploads/' + productToUpdate + 'sub3.' + extension3, req.files.subImage3.data, 'binary', function(err){
    		if (err) 
    		{
    			throw err
    		}
    		else
    		{
    			req.body['subImage3Url'] = '/images/uploads/' + productToUpdate + 'sub3.' + extension3
    		
    			db.collection('products').update({_id: id}, req.body, function(err, result){
					if (err) 
					{
						console.log(err)
					}
					else
					{
						res.redirect('/manageproducts');
					}
				});
    		}
    		
		});
	}
	else
	{
		db.collection('products').update({_id: id}, req.body, function(err, result){
			if (err) 
			{
				console.log(err)
			}
			else
			{
				res.redirect('/manageproducts');
			}

		});
	}
}
