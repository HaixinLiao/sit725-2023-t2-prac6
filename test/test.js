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
});