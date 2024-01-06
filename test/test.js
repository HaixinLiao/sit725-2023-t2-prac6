const chai = require('chai');
const expect = chai.expect;
const request = require('request');
let url = 'http://localhost:3000/api/cat'; 

let testData = {path:'',title:''}

describe('API Tests', function() {
    describe('GET Request Test', function() {
        it('should return a status code of 200', function(done) {
            request(url, function(error, response, body) {
                if (error) {
                    done(error);
                } else {
                    expect(response.statusCode).to.equal(200);
                    done();
                }
            });
        });
    });

    describe('POST Request Test', function() {
        it('should create a resource', function(done) {
            request.post({ url: url, form: {path:'/images/kitten.jpg',title:'cat-1'} }, function(postError, postResponse, postBody) {
                done();
            });
        });
    });

    describe('POST Request Test 2', function() {
        it('should create a resource 2', function(done) {
            request.post({ url: url, form: {path:'/images/kitten-2.jpg',title:'cat-2'} }, function(postError, postResponse, postBody) {
                done();
            });
        });
    });

    describe('POST Request Test 3', function() {
        it('should create a resource 2', function(done) {
            request.post({ url: url, form: {path:'/images/kitten-3.jpg',title:'cat-3'} }, function(postError, postResponse, postBody) {
                done();
            });
        });
    });
    

    describe('POST Request Test with Rollback', function() {
        it('should create a resource and then roll back', function(done) {
            request.post({ url: url, form: testData }, function(postError, postResponse, postBody) {
                if (postError) {
                    done(postError);
                } else {
                    expect(postResponse.statusCode).to.equal(201); 

                    let createdResourceId = JSON.parse(postBody)._id; 

                    request.delete(`${url}/${createdResourceId}`, function(deleteError, deleteResponse, deleteBody) {
                        if (deleteError) {
                            done(deleteError);
                        } else {
                            expect(deleteResponse.statusCode).to.equal(200); 
                            done();
                        }
                    });
                }
            });
        });
    });

    describe('POST Request with Invalid Data Test', function() {
        it('should return error for invalid data', function(done) {
            let invalidData = { path:'/images/error.jpg',title:'cat-6' };
            request.post({ url: url, form: invalidData }, function(error, response, body) {
                if (error) {
                    done(error);
                } else {
                    expect(response.statusCode).to.be.at.least(400);
                    done();
                }
            });
        });
    });

    describe('GET Request Timeout Test', function() {
        it('should return a response within acceptable time', function(done) {
            this.timeout(5000); 
            request(url, function(error, response, body) {
                if (error) {
                    done(error);
                } else {
                    expect(response.statusCode).to.equal(200);
                    done();
                }
            });
        });
    });
});